import expRates from '@/assets/json/exp-rates.json';

export const ExpRates = expRates;

export const getExpRates = (characterLevel: number, monsterLevel: number) => {
  const levelDifference = characterLevel - monsterLevel;
  if (levelDifference <= -40) {
    return {
      rate: 0.1,
      exp: 100,
    };
  } else if (levelDifference >= 40) {
    return {
      rate: 0.7,
      exp: 0,
    };
  }
  return {
    rate: ExpRates[String(levelDifference) as keyof typeof ExpRates] / 100,
    exp: 0,
  };
};
