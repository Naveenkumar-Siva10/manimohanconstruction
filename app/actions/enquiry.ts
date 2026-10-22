"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

/*
 * Enquiry form → email, via Resend (https://resend.com).
 *
 * Environment (see .env.example):
 *   RESEND_API_KEY      API key from the Resend dashboard
 *   CONTACT_TO_EMAIL    where enquiries are delivered (comma-separate several)
 *   CONTACT_FROM_EMAIL  sender on a domain verified in Resend,
 *                       e.g. "Mani Mohan Construction <enquiries@yourdomain.in>"
 *
 * Spam protection is deliberately quiet: a hidden honeypot field, a minimum
 * fill time and a small per-IP rate limit. Bots get a normal-looking success
 * response so they don't learn to adapt.
 */

export type EnquiryKind = "project" | "career";

type Field = "name" | "phone" | "email" | "location" | "service" | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<Field, string>>;
  /** Echoed back so the form keeps what the visitor typed after an error. */
  values?: Partial<Record<Field, string>>;
};

const LIMITS: Record<Field, number> = { name: 80, phone: 20, email: 120, location: 120, service: 120, message: 2000 };
const MIN_FILL_MS = 2500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

/** Best-effort per-instance rate limit (resets when the server restarts). */
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > RATE_MAX;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const text = (formData: FormData, field: Field) => String(formData.get(field) ?? "").trim().slice(0, LIMITS[field]);

export async function sendEnquiry(kind: EnquiryKind, _prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values = {
    name: text(formData, "name"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    location: text(formData, "location"),
    service: text(formData, "service"),
    message: text(formData, "message"),
  };

  // Spam checks — pretend success.
  const honeypot = String(formData.get("website") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success", message: "Thank you — we’ll be in touch shortly." };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Too many enquiries from this connection. Please try again in a few minutes, or call us.", values };
  }

  // Validation
  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.phone = "Please enter a valid mobile number.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = "Please check this email address.";
  if (kind === "project" && values.service && values.service !== "Other" && !SERVICES.some((s) => s.title === values.service)) {
    errors.service = "Please choose a service from the list.";
  }
  if (kind === "career" && values.message.length < 10) errors.message = "Tell us a little about your experience.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.split(",").map((e) => e.trim()).filter(Boolean);
  if (!apiKey || !to?.length) {
    console.error("[enquiry] RESEND_API_KEY or CONTACT_TO_EMAIL is not set — enquiry not sent.", { kind, name: values.name });
    return {
      status: "error",
      message: "Sorry — our online form isn’t available right now. Please call or WhatsApp us instead.",
      values,
    };
  }

  const heading = kind === "career" ? "New job application" : "New project enquiry";
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Mobile", values.phone],
    ["Email", values.email || "—"],
    [kind === "career" ? "Role / trade" : "Service", values.service || "—"],
    [kind === "career" ? "Based in" : "Site location", values.location || "—"],
    [kind === "career" ? "Experience" : "Message", values.message || "—"],
  ];
  const subject = `${heading}${values.service ? ` — ${values.service}` : ""} — ${values.name}`;

  const html = `<!doctype html><html><body style="margin:0;background:#FBF9F5;font-family:Arial,Helvetica,sans-serif;color:#191B1D">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:32px 20px">
<tr><td style="padding-bottom:20px;border-bottom:3px solid #F7B2B7">
<p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5D6166">${escapeHtml(SITE.name)}</p>
<h1 style="margin:8px 0 0;font-size:22px">${escapeHtml(heading)}</h1></td></tr>
<tr><td style="padding-top:16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:10px 12px 10px 0;width:130px;vertical-align:top;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B4475B">${escapeHtml(label)}</td><td style="padding:10px 0;font-size:15px;line-height:1.5;border-bottom:1px solid #E7E1DA;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
  )
  .join("")}
</table></td></tr>
<tr><td style="padding-top:20px;font-size:12px;color:#5D6166">Sent from the enquiry form on ${escapeHtml(SITE.url)}. Reply to this email to answer ${escapeHtml(values.name)} directly${values.email ? "" : " (no email given — please call them)"}.</td></tr>
</table></body></html>`;

  const plain = `${heading}\n\n${rows.map(([l, v]) => `${l}: ${v}`).join("\n")}\n\nSent from ${SITE.url}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || `${SITE.name} <onboarding@resend.dev>`,
      to,
      subject,
      html,
      text: plain,
      ...(values.email ? { replyTo: values.email } : {}),
      tags: [{ name: "type", value: kind }],
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
  } catch (err) {
    console.error("[enquiry] Resend send failed", err);
    return {
      status: "error",
      message: "Sorry — something went wrong sending your message. Please try again, or call or WhatsApp us.",
      values,
    };
  }

  return {
    status: "success",
    message:
      kind === "career"
        ? "Thank you — we’ve received your details and will be in touch when there’s a fit."
        : "Thank you — we’ve received your enquiry and will call you back shortly.",
  };
}
