import { DailyQuest } from '~/composables/quest/daily';
import { useAutoSetStore } from '../setting';
import { useLevelStore } from '../level';

export const useDailyQuestStore = defineStore('dailyQuest', () => {
  const autoSet = useAutoSetStore();
  const level = useLevelStore();
  const dailyQuest = ref(
    DailyQuest.map((quest) => ({ ...quest, isCheck: false })),
  );
  const dailyQuestCheck = computed(() =>
    dailyQuest.value.filter((quest) => quest.isCheck),
  );
  const totalDailyQuestExp = computed(() =>
    dailyQuestCheck.value.reduce((acc, quest) => {
      if (quest.continent === 0) {
        return (
          acc +
          Math.round(quest.exp * (1 + autoSet.dailyQuestArcaneAddExp / 100))
        );
      } else if (quest.continent === 2) {
        return (
          acc +
          Math.round(quest.exp * (1 + autoSet.dailyQuestAuthenticAddExp / 100))
        );
      }
      return acc + quest.exp;
    }, 0),
  );
  const totalDailyQuestExpPer = computed(
    () =>
      +((totalDailyQuestExp.value / getMaxExp(level.level)) * 100).toFixed(3),
  );
  return {
    dailyQuest,
    dailyQuestCheck,
    totalDailyQuestExp,
    totalDailyQuestExpPer,
  };
});
