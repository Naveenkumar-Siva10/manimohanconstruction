import Link from "next/link";
import JsonLd from "@/components/page/JsonLd";
import { SITE } from "@/lib/site";

export type Crumb = { href: string; label: string };

/** Visible breadcrumb trail plus BreadcrumbList structured data. Home is added automatically. */
export default function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const trail = [{ href: "/", label: "Home" }, ...items];
  const muted = tone === "light" ? "text-paper/60" : "text-slate";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold ${muted}`}>
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={tone === "light" ? "text-paper" : "text-ink"}>
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="link-underline">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-rose">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.label,
            item: `${SITE.url}${crumb.href === "/" ? "" : crumb.href}`,
          })),
        }}
      />
    </nav>
  );
}
