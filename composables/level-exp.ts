import levelExp from '@/assets/json/level-exp.json';

export const LevelExp = levelExp;

export function getMaxExp(level: number) {
  return LevelExp[level - 1].exp;
}
