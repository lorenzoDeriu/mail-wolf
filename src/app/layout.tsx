import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mail Wolf — A calmer inbox, with receipts",
    template: "%s — Mail Wolf",
  },
  description:
    "Review, explain, and safely clean up years of Gmail clutter without losing what matters.",
  openGraph: {
    title: "Mail Wolf — A calmer inbox, with receipts",
    description:
      "Review, explain, and safely clean up years of Gmail clutter without losing what matters.",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1eee6" },
    { media: "(prefers-color-scheme: dark)", color: "#181a17" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
