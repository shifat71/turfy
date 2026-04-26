import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, LogIn, MapPin } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turfy — Book Football Turfs Instantly",
  description:
    "Dedicated football turf booking web app. Browse turfs, compare prices, and reserve your slot in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="site-header">
            <div className="container nav">
              <Link className="brand" href="/">
                <span className="brand-mark">
                  <CalendarCheck size={18} />
                </span>
                <span>Turfy</span>
              </Link>
              <nav className="nav-links" aria-label="Primary navigation">
                <Link href="/turfs">Turfs</Link>
                <span>
                  <MapPin size={14} /> Dhaka
                </span>
              </nav>
              <div className="nav-actions">
                <Link className="button secondary" href="/login">
                  <LogIn size={16} />
                  Log in
                </Link>
                <Link className="button" href="/turfs">
                  Book a slot
                </Link>
              </div>
            </div>
          </header>
          {children}
          <footer className="footer">
            <div className="container">
              © 2026 Turfy · Public browsing stays open — login starts at
              checkout.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
