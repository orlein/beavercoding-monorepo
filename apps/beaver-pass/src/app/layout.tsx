import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beaver Pass",
  description: "BeaverCoding OAuth 인증모듈",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
