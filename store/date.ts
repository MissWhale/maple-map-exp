type DateExpInfo = {
  date: Date;
  level: number;
  exp: number;
  expCoupon: number;
  monsterPark: number;
  elixir: Array<{
    key: number;
    count: number;
  }>;
  dailyQuest: Array<{
    name: string;
  }>;
  weeklyQuest: Array<{
    name: string;
  }>;
  hunt: number;
};
export const dateStore = defineStore('date', () => {
  const dateList = ref<DateExpInfo[]>([
    {
      date: new Date(),
      level: 1,
      exp: 0,
      expCoupon: 0,
      monsterPark: 0,
      elixir: [],
      dailyQuest: [],
      weeklyQuest: [],
      hunt: 0,
    },
  ]);
  return {
    dateList,
  };
});
