"use client";

import DashboardLayoutGroup from "./dashboard/_components/DashboardLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F2F0F9" }}>
        <DashboardLayoutGroup>{children}</DashboardLayoutGroup>
      </body>
    </html>
  );
}
