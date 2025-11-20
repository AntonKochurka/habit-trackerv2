export type DateInput = string | Date;

export function toDate(d: DateInput): Date {
  if (d instanceof Date) return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (typeof d === "string") {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) throw new Error(`Cannot parse date string: ${d}`);
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }
  throw new TypeError("Unsupported type");
}

export function normalizeDate(d: DateInput): Date {
  return toDate(d);
}

export function dayOfWeek(d: DateInput): number {
  const day = toDate(d).getDay();
  return day === 0 ? 7 : day;
}

export function daysBetween(d1: DateInput, d2: DateInput): number {
  const delta = Math.abs(toDate(d2).getTime() - toDate(d1).getTime());
  return Math.floor(delta / (1000 * 60 * 60 * 24));
}

export function isSameDay(d1: DateInput, d2: DateInput): boolean {
  const date1 = toDate(d1);
  const date2 = toDate(d2);
  return date1.getTime() === date2.getTime();
}

export function isInRange(d: DateInput, start: DateInput, end: DateInput): boolean {
  const date = toDate(d).getTime();
  return date >= toDate(start).getTime() && date <= toDate(end).getTime();
}