import type { MetadataRoute } from "next";

const routes = ["", "/services", "/assessment", "/work", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route, index) => ({
    url: `https://datapillars.ae${route}`,
    lastModified,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/services" || route === "/assessment" ? 0.9 : 0.75,
  }));
}
