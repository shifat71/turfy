import type { SlotStatus } from "./status";

export type Facility =
  | "Floodlights"
  | "Parking"
  | "Washroom"
  | "Changing room"
  | "Drinking water"
  | "Seating"
  | "Prayer space"
  | "Cafeteria";

export type BusinessProfile = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  openingSummary: string;
};

export type Turf = {
  id: string;
  name: string;
  description: string;
  area: string;
  city: string;
  address: string;
  size: string;
  sports: string[];
  facilities: Facility[];
  openingTime: string;
  closingTime: string;
  defaultPrice: number;
  imageUrl: string;
  isPublished: boolean;
};

export type Slot = {
  id: string;
  turfId: string;
  date: string;
  startTime: string;
  endTime: string;
  basePrice: number;
  finalPrice: number;
  status: SlotStatus;
};

export type PricingRule = {
  id: string;
  turfId: string;
  name: string;
  type: "time_of_day" | "weekend" | "specific_date" | "manual_override";
  price: number;
  priority: number;
  startTime?: string;
  endTime?: string;
  dayOfWeek?: number;
  specificDate?: string;
  slotId?: string;
  isActive: boolean;
};
