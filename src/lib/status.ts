export const bookingStatuses = [
  "pending_payment",
  "confirmed",
  "cancelled",
  "completed",
  "expired",
  "refunded",
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export const paymentStatuses = [
  "initiated",
  "successful",
  "failed",
  "expired",
  "refunded",
] as const;

export type PaymentStatus = (typeof paymentStatuses)[number];

export const receiptStatuses = [
  "valid",
  "verified",
  "cancelled",
  "expired",
  "refunded",
] as const;

export type ReceiptStatus = (typeof receiptStatuses)[number];

export const slotStatuses = [
  "available",
  "pending_payment",
  "booked",
  "unavailable",
] as const;

export type SlotStatus = (typeof slotStatuses)[number];

export const userRoles = ["customer", "owner", "staff", "business_admin"] as const;

export type UserRole = (typeof userRoles)[number];
