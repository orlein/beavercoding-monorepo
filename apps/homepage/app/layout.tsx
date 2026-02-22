import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BeaverCoding — Homepage",
  description: "BeaverCoding 소개 및 블로그",
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
