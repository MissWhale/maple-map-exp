import boss from '@/assets/json/boss.json';

export type BossDifficultyNumber = 0 | 1 | 2 | 3 | 4;

export type BossDifficulty = 'easy' | 'normal' | 'hard' | 'chaos' | 'extreme';

export type BossReward = {
  [key in BossDifficultyNumber]: string;
};

export const BossReward = {
  0: 'easy',
  1: 'normal',
  2: 'hard',
  3: 'chaos',
  4: 'extreme',
};

export const bossList = boss.map((boss) => ({
  id: boss.id,
  name: boss.name,
  orders: boss.orders,
  rewardByDifficulty: boss.rewardByDifficulty,
  rewardByDifficultyNew: boss.rewardByDifficultyNew,
  imagePosition: `-${(boss.id - 1) * 25}px 0px`,
}));
