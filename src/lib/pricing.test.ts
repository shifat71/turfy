import { describe, expect, it } from "vitest";
import { calculateSlotPrice } from "./pricing";
import type { PricingRule, Slot, Turf } from "./types";

const turf: Turf = {
  id: "test-turf",
  name: "Test Turf",
  description: "A test turf",
  area: "Test Area",
  city: "Dhaka",
  address: "Test address",
  size: "5v5",
  sports: ["Football"],
  facilities: ["Floodlights"],
  openingTime: "06:00",
  closingTime: "23:00",
  defaultPrice: 2000,
  imageUrl: "",
  isPublished: true,
};

const slot: Slot = {
  id: "slot-1",
  turfId: "test-turf",
  date: "2026-04-27",
  startTime: "19:00",
  endTime: "20:00",
  basePrice: 2000,
  finalPrice: 2000,
  status: "available",
};

describe("calculateSlotPrice", () => {
  it("uses the turf default price when no pricing rule matches", () => {
    expect(calculateSlotPrice(turf, slot, [])).toBe(2000);
  });

  it("uses the highest priority matching pricing rule", () => {
    const rules: PricingRule[] = [
      {
        id: "time",
        turfId: "test-turf",
        name: "Evening",
        type: "time_of_day",
        startTime: "18:00",
        endTime: "22:00",
        price: 2600,
        priority: 40,
        isActive: true,
      },
      {
        id: "manual",
        turfId: "test-turf",
        name: "Manual",
        type: "manual_override",
        slotId: "slot-1",
        price: 3100,
        priority: 100,
        isActive: true,
      },
    ];

    expect(calculateSlotPrice(turf, slot, rules)).toBe(3100);
  });

  it("ignores inactive rules", () => {
    const rules: PricingRule[] = [
      {
        id: "inactive",
        turfId: "test-turf",
        name: "Inactive",
        type: "time_of_day",
        startTime: "18:00",
        endTime: "22:00",
        price: 9999,
        priority: 100,
        isActive: false,
      },
    ];

    expect(calculateSlotPrice(turf, slot, rules)).toBe(2000);
  });
});
