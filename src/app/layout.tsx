import { Metadata } from "next";
import { projectConfig } from "@/config";

import ClientLayout from "@/components/ClientLayout";

import "../scss/globals.scss";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: projectConfig.title,
  description: projectConfig.description,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F2F0F9", minHeight: "100vh" }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
