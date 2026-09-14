import { useNow } from '@vueuse/core';

export const BOSS_PRICE_CHANGE_AT = new Date('2026-09-17T09:00:00+09:00');

export function useBossPriceNow() {
  const now = useNow({ interval: 60_000 });
  const config = useRuntimeConfig();

  return computed(() => {
    const override = config.public.bossPriceNow;
    if (override) {
      return new Date(override);
    }
    return now.value;
  });
}

export function isAfterBossPriceChange(date: Date): boolean {
  return date.getTime() >= BOSS_PRICE_CHANGE_AT.getTime();
}

export function getBossRewardAt(
  rewardByDifficulty: number[],
  rewardByDifficultyNew: number[] | undefined,
  difficulty: BossDifficultyNumber,
  useNewPrice: boolean,
): number {
  const rewards =
    useNewPrice && rewardByDifficultyNew
      ? rewardByDifficultyNew
      : rewardByDifficulty;
  return rewards[difficulty] ?? 0;
}

export function getBossRewardAmount(
  rewardByDifficulty: number[],
  rewardByDifficultyNew: number[] | undefined,
  difficulty: BossDifficultyNumber,
  member: number,
  date: Date,
): number {
  const useNewPrice = isAfterBossPriceChange(date);
  return Math.floor(
    getBossRewardAt(
      rewardByDifficulty,
      rewardByDifficultyNew,
      difficulty,
      useNewPrice,
    ) / member,
  );
}

export function getUpcomingBossRewardAmount(
  rewardByDifficulty: number[],
  rewardByDifficultyNew: number[] | undefined,
  difficulty: BossDifficultyNumber,
  member: number,
  date: Date,
): number | null {
  if (isAfterBossPriceChange(date) || !rewardByDifficultyNew) return null;

  const oldAmount = Math.floor(rewardByDifficulty[difficulty] / member);
  const newAmount = Math.floor(rewardByDifficultyNew[difficulty] / member);

  if (oldAmount === newAmount) return null;
  return newAmount;
}

export function sumBossRewardAmounts(
  bosses: {
    rewardByDifficulty: number[];
    rewardByDifficultyNew?: number[];
    difficulty: BossDifficultyNumber | null;
    member: number;
  }[],
  date: Date,
): number {
  return bosses.reduce((acc, boss) => {
    if (boss.difficulty === null) return acc;
    return (
      acc +
      getBossRewardAmount(
        boss.rewardByDifficulty,
        boss.rewardByDifficultyNew,
        boss.difficulty,
        boss.member,
        date,
      )
    );
  }, 0);
}

export function sumUpcomingBossRewardAmounts(
  bosses: {
    rewardByDifficulty: number[];
    rewardByDifficultyNew?: number[];
    difficulty: BossDifficultyNumber | null;
    member: number;
  }[],
  date: Date,
): number | null {
  if (isAfterBossPriceChange(date)) return null;

  let hasUpcoming = false;
  const total = bosses.reduce((acc, boss) => {
    if (boss.difficulty === null) return acc;
    const upcoming = getUpcomingBossRewardAmount(
      boss.rewardByDifficulty,
      boss.rewardByDifficultyNew,
      boss.difficulty,
      boss.member,
      date,
    );
    if (upcoming !== null) hasUpcoming = true;
    return (
      acc +
      (upcoming ??
        getBossRewardAmount(
          boss.rewardByDifficulty,
          boss.rewardByDifficultyNew,
          boss.difficulty,
          boss.member,
          date,
        ))
    );
  }, 0);

  return hasUpcoming ? total : null;
}

export type FormattedBossPrice = {
  main: string;
  upcoming?: string;
  changeRate?: string;
  changeDirection?: 'up' | 'down';
};

export function formatChangeRate(
  currentAmount: number,
  upcomingAmount: number,
): { changeRate: string; changeDirection: 'up' | 'down' } | null {
  if (currentAmount <= 0 || currentAmount === upcomingAmount) return null;

  const rate = ((upcomingAmount - currentAmount) / currentAmount) * 100;
  const rounded = Math.round(rate * 10) / 10;
  const sign = rounded > 0 ? '+' : '';

  return {
    changeRate: `${sign}${rounded}%`,
    changeDirection: rounded > 0 ? 'up' : 'down',
  };
}

export function formatBossPriceDisplay(
  rewardByDifficulty: number[],
  rewardByDifficultyNew: number[] | undefined,
  difficulty: BossDifficultyNumber,
  member: number,
  date: Date,
): FormattedBossPrice | null {
  const amount = getBossRewardAmount(
    rewardByDifficulty,
    rewardByDifficultyNew,
    difficulty,
    member,
    date,
  );

  if (amount <= 0) return null;

  const main = transformKoreanBossReward(amount);
  const upcomingAmount = getUpcomingBossRewardAmount(
    rewardByDifficulty,
    rewardByDifficultyNew,
    difficulty,
    member,
    date,
  );

  if (upcomingAmount === null) return { main };

  const change = formatChangeRate(amount, upcomingAmount);

  return {
    main,
    upcoming: transformKoreanBossReward(upcomingAmount),
    ...change,
  };
}

export function formatBossTotalPriceDisplay(
  amount: number,
  upcomingAmount: number | null,
  date: Date,
): FormattedBossPrice {
  if (isAfterBossPriceChange(date)) {
    return { main: transformKoreanBossReward(amount) };
  }

  const main = transformKoreanBossReward(amount);

  if (upcomingAmount === null || upcomingAmount === amount) {
    return { main };
  }

  const change = formatChangeRate(amount, upcomingAmount);

  return {
    main,
    upcoming: transformKoreanBossReward(upcomingAmount),
    ...change,
  };
}
