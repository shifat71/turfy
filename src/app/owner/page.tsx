import Link from "next/link";
import {
  CalendarClock,
  ChartNoAxesCombined,
  ReceiptText,
  Wallet,
} from "lucide-react";
import { formatTaka } from "@/lib/pricing";
import { slots, turfs } from "@/lib/mock-data";

const confirmedRevenue = slots
  .filter((slot) => slot.status === "booked")
  .reduce((total, slot) => total + slot.finalPrice, 0);

export default function OwnerDashboardPage() {
  const availableSlots = slots.filter(
    (slot) => slot.status === "available"
  ).length;
  const bookedSlots = slots.filter((slot) => slot.status === "booked").length;
  const pendingSlots = slots.filter(
    (slot) => slot.status === "pending_payment"
  ).length;

  return (
    <main className="container dashboard">
      <OwnerSidebar active="overview" />
      <section>
        <div className="page-title">
          <p className="eyebrow">Business dashboard</p>
          <h1>Today&apos;s turf operation</h1>
          <p>
            Owner/staff control surface for bookings, slots, receipts, bKash
            payments, and analytics.
          </p>
        </div>

        <div className="metrics">
          <MetricCard
            label="Confirmed revenue"
            value={formatTaka(confirmedRevenue)}
            icon="money"
          />
          <MetricCard
            label="Available slots"
            value={String(availableSlots)}
            icon="slots"
          />
          <MetricCard
            label="Booked slots"
            value={String(bookedSlots)}
            icon="booked"
          />
          <MetricCard
            label="Pending payment"
            value={String(pendingSlots)}
            icon="pending"
          />
        </div>

        <section className="section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Booking board</p>
              <h2>Recent slot status</h2>
            </div>
            <Link className="button secondary" href="/owner/turfs">
              Manage turfs
            </Link>
          </div>
          <div className="panel">
            <table className="table">
              <thead>
                <tr>
                  <th>Turf</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => {
                  const turf = turfs.find((item) => item.id === slot.turfId);

                  return (
                    <tr key={slot.id}>
                      <td>{turf?.name}</td>
                      <td>{slot.date}</td>
                      <td>
                        {slot.startTime} – {slot.endTime}
                      </td>
                      <td>{formatTaka(slot.finalPrice)}</td>
                      <td>
                        <span className={`status ${slot.status}`}>
                          {slot.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: "money" | "slots" | "booked" | "pending";
}) {
  const Icon =
    icon === "money"
      ? Wallet
      : icon === "slots"
        ? CalendarClock
        : icon === "booked"
          ? ReceiptText
          : ChartNoAxesCombined;

  return (
    <article className="metric-card">
      <Icon size={20} color="var(--primary)" />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export function OwnerSidebar({ active }: { active: "overview" | "turfs" }) {
  return (
    <aside className="sidebar" aria-label="Owner navigation">
      <Link className={active === "overview" ? "active" : ""} href="/owner">
        Overview
      </Link>
      <Link className={active === "turfs" ? "active" : ""} href="/owner/turfs">
        Turfs
      </Link>
      <Link href="/owner">Bookings</Link>
      <Link href="/owner">Pricing</Link>
      <Link href="/owner">Receipts</Link>
      <Link href="/owner">Payments</Link>
      <Link href="/owner">Analytics</Link>
    </aside>
  );
}
