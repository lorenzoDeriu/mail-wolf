import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { ReviewWorkspace } from "@/components/review-workspace";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Review workspace",
  description: "Explore how Mail Wolf classifies and safely stages email cleanup.",
};

export default function DashboardPage() {
  return (
    <main className="dashboard-shell">
      <header className="app-header">
        <Link className="brand-link" href="/" aria-label="Mail Wolf home">
          <BrandMark />
          <span>Mail Wolf</span>
        </Link>
        <div className="app-header-actions">
          <span className="demo-label"><span /> Demo workspace</span>
          <ThemeToggle />
          <div className="avatar" aria-label="Demo account">LD</div>
        </div>
      </header>

      <ReviewWorkspace />
    </main>
  );
}
