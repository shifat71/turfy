import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatTaka } from "@/lib/pricing";
import type { Slot } from "@/lib/types";

const statusLabel = {
  available: "Available",
  pending_payment: "Pending payment",
  booked: "Booked",
  unavailable: "Unavailable",
};

export function SlotList({ slots }: { slots: Slot[] }) {
  return (
    <div className="slot-list">
      {slots.map((slot) => {
        const canBook = slot.status === "available";

        return (
          <article className="slot-card" key={slot.id}>
            <div>
              <span className={`status ${slot.status}`}>
                {statusLabel[slot.status]}
              </span>
              <h3 className="card-title">
                {slot.startTime} – {slot.endTime}
              </h3>
              <p className="card-copy">
                {slot.date} · {formatTaka(slot.finalPrice)}
              </p>
            </div>
            {canBook ? (
              <Link className="button" href={`/checkout/${slot.id}`}>
                Book
                <ArrowRight size={16} />
              </Link>
            ) : (
              <button className="button secondary" disabled>
                Unavailable
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}
