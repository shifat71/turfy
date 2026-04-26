import Link from "next/link";
import { OwnerSidebar } from "@/app/owner/page";
import { turfs } from "@/lib/mock-data";
import { formatTaka } from "@/lib/pricing";

export default function OwnerTurfsPage() {
  return (
    <main className="container dashboard">
      <OwnerSidebar active="turfs" />
      <section>
        <div className="page-title">
          <p className="eyebrow">Turf management</p>
          <h1>Manage business turf fields</h1>
          <p>
            This page will connect to Supabase mutations for creating, editing,
            publishing, and blocking turfs.
          </p>
        </div>

        <div className="section-header">
          <div>
            <h2>Published fields</h2>
            <p>Mock data is shown until Supabase persistence is added.</p>
          </div>
          <button className="button" type="button">
            Add turf
          </button>
        </div>

        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Area</th>
                <th>Size</th>
                <th>Base price</th>
                <th>Status</th>
                <th>Public page</th>
              </tr>
            </thead>
            <tbody>
              {turfs.map((turf) => (
                <tr key={turf.id}>
                  <td>{turf.name}</td>
                  <td>{turf.area}</td>
                  <td>{turf.size}</td>
                  <td>{formatTaka(turf.defaultPrice)}</td>
                  <td>
                    <span className={`status ${turf.isPublished ? "available" : "unavailable"}`}>
                      {turf.isPublished ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <Link className="button secondary" href={`/turfs/${turf.id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
