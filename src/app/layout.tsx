import ReactQueryPvorider from "@/utils/react-query";
import AuthCheck from "@/components/auth-check";
import { Outfit } from "next/font/google";

import "../scss/globals.scss";
import "../styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthCheck />
        <ReactQueryPvorider>{children}</ReactQueryPvorider>
      </body>
    </html>
  );
}
