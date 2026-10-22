import type { Metadata } from "next";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import SectionLabel from "@/components/ui/SectionLabel";
import { CONTACT, SITE, isPlaceholder } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles the details you share through this website.`,
  alternates: { canonical: "/privacy-policy" },
};

const UPDATED = "22 October 2026";

/*
 * A plain-language policy that matches what the site actually does: the
 * enquiry forms send an email (via Resend) and nothing else is stored; there
 * are no analytics or advertising cookies. Update it if that changes.
 */
export default function PrivacyPolicyPage() {
  const email = isPlaceholder(CONTACT.email) ? "the email address on our Contact page" : CONTACT.email;
  const sections = [
    {
      title: "What we collect",
      body: [
        "When you send an enquiry or job application through this website, we receive the details you type in: your name, mobile number and, if you choose to give them, your email address, location, the service or role you’re interested in and your message.",
        "We don’t ask for anything else, and we don’t use analytics, advertising or tracking cookies on this website.",
      ],
    },
    {
      title: "How we use it",
      body: [
        "We use your details only to reply to you — to discuss your project, arrange a site visit, prepare an estimate or consider you for work with us.",
        "We never sell your details or share them for marketing.",
      ],
    },
    {
      title: "How it reaches us",
      body: [
        "Form submissions are delivered to our inbox as an email using Resend, an email delivery service, which processes the message only to deliver it. Our website host also keeps short-lived technical logs (such as IP addresses) to keep the site secure and working.",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "We keep enquiries for as long as we need them to discuss and carry out your project, and job applications for as long as they’re relevant to the work we have. You can ask us to delete your details at any time.",
      ],
    },
    {
      title: "Your choices",
      body: [
        `You can ask what details we hold about you, ask us to correct them or ask us to delete them by writing to ${email}. We’ll respond as soon as we can.`,
      ],
    },
    {
      title: "Changes",
      body: ["If we change how we handle your details, we’ll update this page and the date below."],
    },
  ];

  return (
    <main id="main" tabIndex={-1} className="bg-paper pb-24 pt-32 outline-none md:pb-32 md:pt-40">
      <div className="container-site max-w-[52rem]">
        <Breadcrumbs items={[{ href: "/privacy-policy", label: "Privacy Policy" }]} />
        <SectionLabel className="mt-8">Legal</SectionLabel>
        <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] text-ink">
          Privacy <span className="accent text-rose">policy</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75">
          {SITE.name} respects your privacy. This page explains, in plain language, what happens to the details you share with us through this website.
        </p>
        <div className="mt-14 space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-line pt-8">
              <h2 className="font-display text-2xl tracking-[-0.03em] text-ink">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-lg leading-relaxed text-slate">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-14 text-sm font-semibold text-slate">Last updated: {UPDATED}</p>
      </div>
    </main>
  );
}
