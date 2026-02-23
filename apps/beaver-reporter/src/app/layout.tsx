import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beaver Reporter",
  description: "BeaverCoding 데이터 수집 서비스",
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
