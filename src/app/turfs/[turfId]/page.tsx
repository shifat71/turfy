import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { SlotList } from "@/components/slot-list";
import { formatTaka } from "@/lib/pricing";
import { getSlotsForTurf, getTurfById } from "@/lib/selectors";

export default async function TurfDetailsPage({
  params,
}: {
  params: Promise<{ turfId: string }>;
}) {
  const { turfId } = await params;
  const turf = getTurfById(turfId);

  if (!turf) {
    notFound();
  }

  const turfSlots = getSlotsForTurf(turf.id);

  return (
    <main className="container">
      <section className="page-title">
        <p className="eyebrow">{turf.area}</p>
        <h1>{turf.name}</h1>
        <p>{turf.description}</p>
      </section>

      <section className="details-layout">
        <div className="panel">
          <div
            aria-label={turf.name}
            className="detail-image"
            style={{ backgroundImage: `url(${turf.imageUrl})` }}
          />
          <div className="turf-meta" style={{ padding: "0 20px" }}>
            <span className="pill">
              <MapPin size={13} />
              {turf.address}
            </span>
            <span className="pill">{turf.size}</span>
            <span className="pill">
              {turf.openingTime}–{turf.closingTime}
            </span>
          </div>
          <div style={{ padding: "0 20px 20px" }}>
            <h2 className="card-title">Facilities</h2>
            <div className="turf-meta">
              {turf.facilities.map((facility) => (
                <span className="pill" key={facility}>
                  {facility}
                </span>
              ))}
            </div>
            <p className="card-copy">
              Starting price is {formatTaka(turf.defaultPrice)}. Final prices
              may change per slot based on peak hours, weekends, and manual
              overrides.
            </p>
          </div>
        </div>

        <aside className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">April 27, 2026</p>
              <h2>Available slots</h2>
              <p>Login starts after choosing an available slot.</p>
            </div>
          </div>
          <SlotList slots={turfSlots} />
        </aside>
      </section>
    </main>
  );
}
