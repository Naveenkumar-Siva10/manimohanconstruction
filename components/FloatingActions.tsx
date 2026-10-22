import { contactLinks } from "@/lib/site";

/** Always-available WhatsApp and call shortcuts, bottom-right. */
export default function FloatingActions() {
  const whatsappExternal = contactLinks.whatsapp.startsWith("http");
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:bottom-7 md:right-7">
      <a
        href={contactLinks.whatsapp}
        aria-label="Chat with us on WhatsApp"
        {...(whatsappExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-12px_rgba(25,27,29,0.6)] transition-transform duration-300 hover:scale-110"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.82.83-3-.2-.31a8.2 8.2 0 1 1 6.97 3.82Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06c0 1.21.88 2.38 1 2.55.12.16 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
        </svg>
      </a>
      <a
        href={contactLinks.call}
        aria-label="Call us"
        className="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper shadow-[0_14px_30px_-12px_rgba(25,27,29,0.6)] transition-transform duration-300 hover:scale-110 lg:hidden"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
        </svg>
      </a>
    </div>
  );
}
