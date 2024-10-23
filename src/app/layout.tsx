// "use client";

import React, { useEffect, useState } from "react";
import ReactQueryProvider from "@/utils/react-query";
import AuthCheck from "@/components/auth-check";

import "../scss/globals.scss";
import "../styles/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [hydrated, setHydrated] = useState(false);

  // useEffect(() => {
  //   setHydrated(true);
  // }, []);

  // if (!hydrated) return <div>Loading...</div>;

  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ backgroundColor: "#F2F0F9" }}>
        <AuthCheck />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
