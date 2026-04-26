import { describe, expect, it } from "vitest";
import {
  getAvailabilityCounts,
  getAvailableTurfs,
  getPublishedTurfs,
  getTurfById,
} from "./selectors";

describe("public selectors", () => {
  it("returns only published turfs", () => {
    expect(getPublishedTurfs().every((turf) => turf.isPublished)).toBe(true);
  });

  it("finds a public turf by id", () => {
    expect(getTurfById("bashundhara-5v5")?.name).toBe("Bashundhara 5v5 Turf");
  });

  it("returns published turfs that have at least one available slot", () => {
    expect(getAvailableTurfs().map((turf) => turf.id)).toEqual([
      "bashundhara-5v5",
      "uttara-7v7",
      "mirpur-training",
    ]);
  });

  it("counts slot availability by status", () => {
    expect(getAvailabilityCounts("bashundhara-5v5")).toEqual({
      available: 2,
      booked: 1,
      pending_payment: 1,
      unavailable: 0,
    });
  });
});
