"use client";

import React from "react";
import ReactQueryProvider from "@/utils/react-query";
import AuthCheck from "@/components/auth-check";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthCheck />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </>
  );
}
