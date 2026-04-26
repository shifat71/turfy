import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CreditCard,
  MapPin,
  QrCode,
  Sparkles,
  Phone,
  Clock,
  ShieldCheck,
  Trophy,
  Users,
  Mail
} from "lucide-react";
import { TurfCard } from "@/components/turf-card";
import { businessProfile } from "@/lib/mock-data";
import { getAvailableTurfs, getPublishedTurfs } from "@/lib/selectors";

export default function HomePage() {
  const publishedTurfs = getPublishedTurfs();
  const availableTurfs = getAvailableTurfs();

  return (
    <main>
      {/* Premium Hero Section */}
      <section className="hero-premium">
        <div className="container hero-content">
          <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.3)", padding: "8px 16px", borderRadius: "999px" }}>
            <Sparkles size={16} /> Premium Sports Experience
          </p>
          <h1 className="hero-title">{businessProfile.name}</h1>
          <p className="hero-subtitle">{businessProfile.tagline}</p>
          
          <div className="nav-actions" style={{ justifyContent: "center", marginBottom: "48px" }}>
            <Link className="button" href="#turfs" style={{ padding: "0 32px", height: "54px", fontSize: "1.1rem" }}>
              Book a Turf Now
              <ArrowRight size={20} />
            </Link>
            <Link className="button secondary" href="/login" style={{ padding: "0 32px", height: "54px", fontSize: "1.1rem", background: "rgba(255,255,255,0.1)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
              Log in
            </Link>
          </div>

          <div className="glass-panel contact-bar">
            <div className="contact-item">
              <MapPin size={20} color="var(--accent)" />
              {businessProfile.address}, {businessProfile.city}
            </div>
            <div className="contact-item">
              <Phone size={20} color="var(--accent)" />
              {businessProfile.phone}
            </div>
            <div className="contact-item">
              <Clock size={20} color="var(--accent)" />
              {businessProfile.openingSummary}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Turfs Section */}
      <section className="container section" id="turfs">
        <div className="section-header" style={{ textAlign: "center", flexDirection: "column", alignItems: "center", marginBottom: "48px" }}>
          <p className="eyebrow">Quick Booking</p>
          <h2>Select a Turf to Book Slots</h2>
          <p style={{ margin: "0 auto" }}>
            Browse our multiple arenas and secure your slot instantly.
          </p>
        </div>
        
        <div className="turf-slider">
          {availableTurfs.map((turf) => (
            <TurfCard key={turf.id} turf={turf} />
          ))}
        </div>
      </section>

      {/* Business Info Section */}
      <section className="container section">
        <div className="glass-panel" style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center", background: "var(--surface)", padding: "clamp(24px, 5vw, 48px)", borderColor: "var(--line)", color: "var(--text)" }}>
          <div style={{ flex: "1 1 400px" }}>
            <p className="eyebrow" style={{ marginBottom: "16px" }}>About Our Arena</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", marginBottom: "20px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Elevate Your Game at {businessProfile.name}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "32px" }}>
              {businessProfile.tagline} We bring professional-grade playing surfaces to {businessProfile.city}, ensuring that every match you play is on a high-quality, well-maintained turf. Our facilities are designed for players who demand the best.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "1.05rem", fontWeight: 500 }}>
                <div style={{ padding: "10px", background: "var(--primary-soft)", borderRadius: "var(--radius-xs)", color: "var(--primary)" }}>
                  <Mail size={20} />
                </div>
                {businessProfile.email}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "1.05rem", fontWeight: 500 }}>
                <div style={{ padding: "10px", background: "var(--primary-soft)", borderRadius: "var(--radius-xs)", color: "var(--primary)" }}>
                  <MapPin size={20} />
                </div>
                {businessProfile.address}, {businessProfile.city}
              </div>
            </div>
          </div>
          <div style={{ flex: "1 1 400px", borderRadius: "var(--radius)", overflow: "hidden", aspectRatio: "4/3", boxShadow: "var(--shadow)" }}>
            <div style={{ width: "100%", height: "100%", backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbb211a5b2?auto=format&fit=crop&w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container section" style={{ paddingBottom: "80px" }}>
        <div className="section-header" style={{ textAlign: "center", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
          <p className="eyebrow">Why Choose Turfy</p>
          <h2>The Ultimate Playing Experience</h2>
        </div>
        
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon-wrapper">
              <CalendarDays size={28} />
            </div>
            <h3 className="card-title">Instant Booking</h3>
            <p className="card-copy">
              Real-time slot availability means no double bookings. See what's open and secure your game instantly.
            </p>
          </article>
          
          <article className="feature-card">
            <div className="feature-icon-wrapper">
              <CreditCard size={28} />
            </div>
            <h3 className="card-title">Secure bKash Payments</h3>
            <p className="card-copy">
              Pay seamlessly through bKash with instant server-side confirmation before your booking is finalized.
            </p>
          </article>
          
          <article className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={28} />
            </div>
            <h3 className="card-title">Verified Receipts</h3>
            <p className="card-copy">
              Get an instant digital receipt with a QR code for quick check-in at the counter upon arrival.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon-wrapper">
              <Trophy size={28} />
            </div>
            <h3 className="card-title">Premium Quality</h3>
            <p className="card-copy">
              All our turfs are regularly maintained to ensure a FIFA-standard playing surface for all matches.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon-wrapper">
              <Users size={28} />
            </div>
            <h3 className="card-title">Community Events</h3>
            <p className="card-copy">
              Join regular tournaments and leagues hosted exclusively on our premium turf grounds.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon-wrapper">
              <QrCode size={28} />
            </div>
            <h3 className="card-title">Digital Access</h3>
            <p className="card-copy">
              Manage all your bookings, receipts, and history from your personal digital dashboard.
            </p>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="cta-section">
          <div className="cta-content">
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "16px", color: "white" }}>Ready for Kickoff?</h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
              Join thousands of players who book their football matches with us. Secure your preferred slot before it's gone.
            </p>
            <Link className="button" href="/turfs" style={{ padding: "0 40px", height: "60px", fontSize: "1.2rem", borderRadius: "999px", background: "var(--accent)", color: "var(--text)" }}>
              Browse Available Slots
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
