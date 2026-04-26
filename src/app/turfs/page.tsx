import { TurfCard } from "@/components/turf-card";
import { businessProfile } from "@/lib/mock-data";
import { getPublishedTurfs } from "@/lib/selectors";

export default function TurfsPage() {
  const publishedTurfs = getPublishedTurfs();

  return (
    <main className="container">
      <section className="page-title">
        <p className="eyebrow">{businessProfile.city} turf locations</p>
        <h1>Browse turf fields and open slots</h1>
        <p>
          Public visitors can compare location, facilities, prices, and slot
          status before logging in.
        </p>
      </section>

      <section className="grid" aria-label="Published turfs">
        {publishedTurfs.map((turf) => (
          <TurfCard key={turf.id} turf={turf} />
        ))}
      </section>
    </main>
  );
}
