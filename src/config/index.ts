const siteUrl = process.env.NEXT_PUBLIC_APP_URL;
const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const projectConfig = {
  title: "Tour Mart Limited",
  description: "Tour Mart Limited",
  siteUrl,
  apiBaseUrl,
};

export type ProjectConfig = typeof projectConfig;
