import type { MetadataRoute } from "next";
import { SERVICES, serviceHref } from "@/lib/services";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...SERVICES.map((s) => page(serviceHref(s.slug), 0.8)),
    page("/projects", 0.8, "weekly"),
    page("/about", 0.7),
    page("/contact", 0.8),
    page("/careers", 0.4),
    page("/privacy-policy", 0.2, "yearly"),
  ];
}
