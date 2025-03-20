export function makeComma(
  value: number | string | null | undefined | ComputedRef<number>,
): string | null {
  if (typeof value === 'object') {
    return makeComma(String(unref(value)));
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
export function calculatorPercent(exp: number, maxExp: number): number {
  return +(Math.round((exp / maxExp) * 100000) / 1000).toFixed(3);
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
export function transformKoreanBossReward(reward: number): string {
  const units = ['', '만', '억', '조'];
  const value = reward.toString();
  const length = value.length;
  const unitIndex = Math.floor((length - 1) / 4);

  if (unitIndex === 0) {
    return value;
  }

  const result = [];
  for (let i = unitIndex; i >= 0; i--) {
    const start = Math.max(0, length - (i + 1) * 4);
    const end = length - i * 4;
    const num = parseInt(value.slice(start, end));
    if (num > 0) {
      result.push(num + units[i]);
    }
  }

  return result.join(' ');
}
