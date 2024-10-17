import ReduxStoreProvider from "@/components/Providers/ReduxStoreProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F2F0F9" }}>
        <ReduxStoreProvider>{children}</ReduxStoreProvider>
      </body>
    </html>
  );
}
