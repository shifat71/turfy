import Link from "next/link";
import { CalendarRange, Clock, MapPin, Trophy } from "lucide-react";
import { getAvailabilityCounts } from "@/lib/selectors";
import { formatTaka } from "@/lib/pricing";
import type { Turf } from "@/lib/types";

export function TurfCard({ turf }: { turf: Turf }) {
  const counts = getAvailabilityCounts(turf.id);

  return (
    <article className="turf-card" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface)", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--line)", transition: "all 0.3s ease", position: "relative" }}>
      <div
        aria-label={turf.name}
        style={{
          height: "220px",
          backgroundImage: `url(${turf.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", padding: "8px 12px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold", fontSize: "0.85rem", color: "var(--success)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)", animation: "pulse 2s infinite" }} />
          {counts.available} Slots Open Today
        </div>
      </div>
      
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>{turf.name}</h3>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)", whiteSpace: "nowrap" }}>
            {formatTaka(turf.defaultPrice)}<span style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>/hr</span>
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          <span className="pill" style={{ background: "var(--surface-muted)", color: "var(--text)" }}>
            <MapPin size={14} color="var(--primary)" />
            {turf.area}
          </span>
          <span className="pill" style={{ background: "var(--surface-muted)", color: "var(--text)" }}>
            <Trophy size={14} color="var(--primary)" />
            {turf.size}
          </span>
          <span className="pill" style={{ background: "var(--surface-muted)", color: "var(--text)" }}>
            <Clock size={14} color="var(--primary)" />
            {turf.openingTime}–{turf.closingTime}
          </span>
        </div>

        <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px", flexGrow: 1 }}>
          {turf.description}
        </p>

        <Link 
          href={`/turfs/${turf.id}`}
          className="button"
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "1.05rem",
          }}
        >
          <CalendarRange size={20} />
          Check Availability & Book
        </Link>
      </div>
    </article>
  );
}
