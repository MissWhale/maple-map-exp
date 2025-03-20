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

export const bossList = boss.map((boss, index) => ({
  id: boss.id,
  name: boss.name,
  rewardByDifficulty: boss.rewardByDifficulty,
  imagePosition: `-${index * 25}px 0px`,
}));
