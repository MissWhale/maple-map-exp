export function makeComma(
  value: number | string | null | undefined,
): string | null {
  if (value === null || value === undefined) return null;
  else if (typeof value === 'string')
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  else return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
