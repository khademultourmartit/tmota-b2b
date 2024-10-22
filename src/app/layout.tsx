import ReactQueryPvorider from "@/utils/react-query";
import AuthCheck from "@/components/auth-check";

import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F2F0F9" }}>
        <AuthCheck />
        <ReactQueryPvorider>{children}</ReactQueryPvorider>
      </body>
    </html>
  );
}
