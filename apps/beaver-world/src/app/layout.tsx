import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beaver World",
  description: "BeaverCoding 커뮤니티",
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
