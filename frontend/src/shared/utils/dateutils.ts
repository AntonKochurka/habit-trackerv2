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
