export function makeComma(
  value: number | string | null | undefined | ComputedRef<number>,
): string | null {
  if (typeof value === 'object') {
    return String(unref(value));
  }
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
export const arrayDay = ['일', '월', '화', '수', '목', '금', '토'];
export function dateFormat(date?: Date | string): string {
  if (!date) return '';
  let setDate = typeof date === 'string' ? new Date(date) : date;
  let month: string | number = setDate.getMonth() + 1;
  let day: string | number = setDate.getDate();
  let dayOfWeek = arrayDay[setDate.getDay()];
  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return (
    setDate.getFullYear() + '-' + month + '-' + day + '(' + dayOfWeek + ')'
  );
}
