export function makeComma(
  value: number | string | null | undefined,
): string | null {
  if (value === null || value === undefined) return null;
  else if (typeof value === 'string')
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  else return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function range(start: number, end: number): number[] {
  const arr = Array.from({ length: end - start }, (_, i) => start + i);
  return arr;
}

export function getIsSunday(inDate: Date): boolean {
  const day = new Date(inDate).getDay();
  return day === 0;
}
