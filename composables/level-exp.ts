import levelExp from '@/assets/json/level-exp.json';

export const LevelExp = levelExp;

export function getMaxExp(level: number) {
  if (level < 1 || level > 299) return 0;
  return LevelExp[level - 1].exp;
}
export function getTotalExp(level: number) {
  if (level < 1) return 0;
  if (level > 299) return 8514022615723320;
  return LevelExp[level - 1].totalExp;
}
