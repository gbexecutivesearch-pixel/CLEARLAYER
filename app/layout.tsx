import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClearLayer | Secure Payout Portal",
  description: "Secure digital payout processing by ClearLayer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
