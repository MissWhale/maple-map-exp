import { WeeklyQuest } from '~/composables/quest/weekly';
import { useLevelStore } from '../level';
import { useAutoSetStore } from '../setting';

export const useWeeklyQuestStore = defineStore('weeklyQuest', () => {
  const autoSet = useAutoSetStore();
  const level = useLevelStore();
  const weeklyQuest = ref(WeeklyQuest.map((quest) => ({ ...quest, count: 0 })));
  const onWeeklyQuest = computed(() =>
    weeklyQuest.value.filter((quest) => quest.count > 0),
  );
  const totalWeeklyQuestExp = computed(() =>
    onWeeklyQuest.value.reduce(
      (acc, quest) => acc + quest.exp * quest.count,
      0,
    ),
  );
  const totalWeeklyQuestExpPer = computed(
    () =>
      +((totalWeeklyQuestExp.value / getMaxExp(level.level)) * 100).toFixed(3),
  );
  const autoSelectWeeklyQuest = () => {
    if (level.level < 200) return resetWeeklyQuest();
    if (autoSet.weeklyQuestAutoSelect) {
      weeklyQuest.value
        .filter((x) => x.min <= level.level)
        .forEach((quest) => {
          if (quest.skipLevel2 <= level.level) {
            quest.count = 1;
          } else if (quest.skipLevel1 <= level.level) {
            quest.count = 2;
          } else {
            quest.count = 3;
          }
        });
    }
  };
  const resetWeeklyQuest = () => {
    weeklyQuest.value.forEach((quest) => {
      quest.count = 0;
    });
  };
  watch(() => level.level, autoSelectWeeklyQuest);
  watch(() => autoSet.weeklyQuestAutoSelect, autoSelectWeeklyQuest);
  onMounted(() => {
    autoSelectWeeklyQuest();
  });
  return {
    weeklyQuest,
    totalWeeklyQuestExp,
    totalWeeklyQuestExpPer,
    resetWeeklyQuest,
  };
});
