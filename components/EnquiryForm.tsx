"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { sendEnquiry, type EnquiryKind, type EnquiryState } from "@/app/actions/enquiry";
import { ArrowIcon } from "@/components/ui/Button";
import { SERVICES } from "@/lib/services";

type EnquiryFormProps = {
  kind?: EnquiryKind;
  /** Pre-selects a service (by title) — used on service landing pages. */
  defaultService?: string;
  /** "light" for cream backgrounds, "dark" for charcoal sections. */
  tone?: "light" | "dark";
  /** Prefix for field ids when the form appears more than once. */
  idPrefix?: string;
};

const initialState: EnquiryState = { status: "idle", message: "" };

/**
 * Project / job enquiry form. Submits to the `sendEnquiry` server action
 * (Resend email). Works without JavaScript as a plain form post; with JS it
 * shows inline errors and a thank-you panel.
 */
export default function EnquiryForm({ kind = "project", defaultService = "", tone = "light", idPrefix = "enquiry" }: EnquiryFormProps) {
  const action = useMemo(() => sendEnquiry.bind(null, kind), [kind]);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [startedAt, setStartedAt] = useState(0);
  const statusRef = useRef<HTMLParagraphElement>(null);

  // Time the visitor started filling in the form (spam check, see the action).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Date.now() must be read in the browser.
    setStartedAt(Date.now());
  }, []);

  // Move focus to the result so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const dark = tone === "dark";
  const label = `mb-2 block text-xs font-bold uppercase tracking-[0.16em] ${dark ? "text-paper/70" : "text-slate"}`;
  const field = `w-full rounded-2xl border px-4 py-3.5 text-base outline-none transition-[border-color,box-shadow] duration-300 focus:ring-4 ${
    dark
      ? "border-paper/15 bg-paper/[0.06] text-paper placeholder:text-paper/35 focus:border-blush focus:ring-blush/20"
      : "border-line bg-surface text-ink placeholder:text-slate/60 focus:border-ink focus:ring-ink/10"
  }`;
  const errorText = `mt-1.5 text-sm font-semibold ${dark ? "text-blush" : "text-rose"}`;
  const v = state.values ?? {};
  const err = state.errors ?? {};
  const isCareer = kind === "career";

  if (state.status === "success") {
    return (
      <div className={`rounded-[2rem] p-8 md:p-10 ${dark ? "bg-paper/[0.06]" : "border border-line bg-surface"}`}>
        <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-blush text-ink">
          <svg viewBox="0 0 16 16" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 8.5 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p ref={statusRef} tabIndex={-1} role="status" className={`mt-6 font-display text-2xl leading-tight outline-none ${dark ? "text-paper" : "text-ink"}`}>
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2" aria-describedby={`${idPrefix}-status`}>
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" value={startedAt || ""} />

      <div>
        <label htmlFor={`${idPrefix}-name`} className={label}>
          Your name *
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          defaultValue={v.name}
          aria-invalid={!!err.name}
          aria-describedby={err.name ? `${idPrefix}-name-error` : undefined}
          className={field}
        />
        {err.name && (
          <p id={`${idPrefix}-name-error`} className={errorText}>
            {err.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-phone`} className={label}>
          Mobile number *
        </label>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          required
          inputMode="tel"
          maxLength={20}
          autoComplete="tel"
          placeholder="+91"
          defaultValue={v.phone}
          aria-invalid={!!err.phone}
          aria-describedby={err.phone ? `${idPrefix}-phone-error` : undefined}
          className={field}
        />
        {err.phone && (
          <p id={`${idPrefix}-phone-error`} className={errorText}>
            {err.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-email`} className={label}>
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          maxLength={120}
          autoComplete="email"
          defaultValue={v.email}
          aria-invalid={!!err.email}
          aria-describedby={err.email ? `${idPrefix}-email-error` : undefined}
          className={field}
        />
        {err.email && (
          <p id={`${idPrefix}-email-error`} className={errorText}>
            {err.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-location`} className={label}>
          {isCareer ? "Where are you based?" : "Site location"}
        </label>
        <input
          id={`${idPrefix}-location`}
          name="location"
          maxLength={120}
          autoComplete={isCareer ? "address-level2" : "off"}
          placeholder={isCareer ? "e.g. Tambaram" : "e.g. Saidapet, Chennai"}
          defaultValue={v.location}
          className={field}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-service`} className={label}>
          {isCareer ? "Role or trade" : "What do you need?"}
        </label>
        {isCareer ? (
          <input
            id={`${idPrefix}-service`}
            name="service"
            maxLength={120}
            placeholder="e.g. Site engineer, mason, electrician"
            defaultValue={v.service}
            className={field}
          />
        ) : (
          <select
            id={`${idPrefix}-service`}
            name="service"
            defaultValue={v.service ?? defaultService}
            aria-invalid={!!err.service}
            className={`${field} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-12`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='${dark ? "%23FBF9F5" : "%23191B1D"}' stroke-width='1.8'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")`,
            }}
          >
            <option value="">Choose a service (optional)</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Something else</option>
          </select>
        )}
        {err.service && <p className={errorText}>{err.service}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-message`} className={label}>
          {isCareer ? "Your experience *" : "Tell us about your project"}
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          maxLength={2000}
          required={isCareer}
          placeholder={isCareer ? "Years of experience, the kind of sites you’ve worked on…" : "Plot size, number of floors, timeline, budget…"}
          defaultValue={v.message}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? `${idPrefix}-message-error` : undefined}
          className={`${field} resize-y`}
        />
        {err.message && (
          <p id={`${idPrefix}-message-error`} className={errorText}>
            {err.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          id={`${idPrefix}-status`}
          ref={statusRef}
          tabIndex={-1}
          role={state.status === "error" ? "alert" : undefined}
          className={`text-sm outline-none ${state.status === "error" ? `font-semibold ${dark ? "text-blush" : "text-rose"}` : dark ? "text-paper/55" : "text-slate"}`}
        >
          {state.status === "error"
            ? state.message
            : isCareer
              ? "We only use your details to consider you for work with us."
              : "We’ll get back to you as soon as we can."}
        </p>
        <button type="submit" disabled={pending} className={`btn ${dark ? "btn-blush" : ""} shrink-0 disabled:cursor-wait disabled:opacity-70`}>
          <span className="btn-label" data-text={pending ? "Sending…" : isCareer ? "Send application" : "Send enquiry"}>
            <span>{pending ? "Sending…" : isCareer ? "Send application" : "Send enquiry"}</span>
          </span>
          <span className="btn-icon">
            <ArrowIcon />
          </span>
        </button>
      </div>
    </form>
  );
}
