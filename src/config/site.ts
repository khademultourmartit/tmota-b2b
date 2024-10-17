const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const apiBaseUrl =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3900";

export const siteConfig = {
  title: "Tour Mart Limited",
  description: "Tour Mart Limited",
  siteUrl,
  apiBaseUrl,
};

export type SiteConfig = typeof siteConfig;
