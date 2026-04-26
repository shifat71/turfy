import type { PricingRule, Slot, Turf } from "./types";

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const isWithinRuleTime = (slot: Slot, rule: PricingRule) => {
  if (!rule.startTime || !rule.endTime) {
    return true;
  }

  return (
    timeToMinutes(slot.startTime) >= timeToMinutes(rule.startTime) &&
    timeToMinutes(slot.endTime) <= timeToMinutes(rule.endTime)
  );
};

const matchesRule = (slot: Slot, rule: PricingRule) => {
  if (!rule.isActive || rule.turfId !== slot.turfId) {
    return false;
  }

  if (rule.type === "manual_override") {
    return rule.slotId === slot.id;
  }

  if (rule.type === "specific_date") {
    return rule.specificDate === slot.date && isWithinRuleTime(slot, rule);
  }

  if (rule.type === "weekend") {
    const day = new Date(`${slot.date}T00:00:00`).getDay();
    return rule.dayOfWeek === day && isWithinRuleTime(slot, rule);
  }

  return isWithinRuleTime(slot, rule);
};

export const calculateSlotPrice = (
  turf: Turf,
  slot: Slot,
  rules: PricingRule[],
) => {
  const matchingRules = rules
    .filter((rule) => matchesRule(slot, rule))
    .sort((a, b) => b.priority - a.priority);

  return matchingRules[0]?.price ?? turf.defaultPrice;
};

export const formatTaka = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
