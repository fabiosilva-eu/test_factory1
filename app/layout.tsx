import type { ReactNode } from "react";

export const metadata = { title: "test_factory1", description: "Next.js baseline" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
