import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { formatTaka } from "@/lib/pricing";
import { getSlotById, getTurfById } from "@/lib/selectors";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slotId: string }>;
}) {
  const { slotId } = await params;
  const slot = getSlotById(slotId);

  if (!slot) {
    notFound();
  }

  const turf = getTurfById(slot.turfId);

  if (!turf) {
    notFound();
  }

  return (
    <main className="container">
      <section className="page-title">
        <p className="eyebrow">Checkout</p>
        <h1>Log in to place this order</h1>
        <p>
          Browsing is public, but booking requires a customer account so orders,
          payments, and receipts can be saved.
        </p>
      </section>

      <section className="details-layout">
        <article className="panel">
          <h2 className="card-title">Booking summary</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>Turf</th>
                <td>{turf.name}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{slot.date}</td>
              </tr>
              <tr>
                <th>Time</th>
                <td>
                  {slot.startTime} – {slot.endTime}
                </td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>
                  <span className="price">{formatTaka(slot.finalPrice)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </article>

        <aside className="panel">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <LockKeyhole size={20} color="var(--primary)" />
            <ShieldCheck size={20} color="var(--primary)" />
          </div>
          <h2 className="card-title">Authentication gate</h2>
          <p className="card-copy">
            This screen will connect to Supabase Auth. After login, the app will
            create a pending booking hold and start the bKash payment flow.
          </p>
          <div className="card-footer">
            <button className="button" type="button">
              Continue with login
            </button>
            <Link className="button secondary" href={`/turfs/${turf.id}`}>
              <ArrowLeft size={16} />
              Back to slots
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
