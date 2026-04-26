import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container">
      <section className="page-title" style={{ textAlign: "center", padding: "80px 0" }}>
        <p className="eyebrow">404 · Not found</p>
        <h1>This page doesn&apos;t exist</h1>
        <p style={{ margin: "8px auto 24px" }}>
          The turf, slot, or page you requested could not be found.
        </p>
        <Link className="button" href="/">
          <ArrowLeft size={16} />
          Back home
        </Link>
      </section>
    </main>
  );
}
