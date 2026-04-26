import { slots, turfs } from "./mock-data";
import type { SlotStatus } from "./status";

export const getPublishedTurfs = () => turfs.filter((turf) => turf.isPublished);

export const getTurfById = (id: string) =>
  getPublishedTurfs().find((turf) => turf.id === id);

export const getSlotsForTurf = (turfId: string) =>
  slots.filter((slot) => slot.turfId === turfId);

export const getAvailableTurfs = () =>
  getPublishedTurfs().filter((turf) =>
    getSlotsForTurf(turf.id).some((slot) => slot.status === "available"),
  );

export const getSlotById = (slotId: string) =>
  slots.find((slot) => slot.id === slotId);

export const getAvailabilityCounts = (turfId: string) =>
  getSlotsForTurf(turfId).reduce<Record<SlotStatus, number>>(
    (counts, slot) => {
      counts[slot.status] += 1;
      return counts;
    },
    {
      available: 0,
      booked: 0,
      pending_payment: 0,
      unavailable: 0,
    },
  );
