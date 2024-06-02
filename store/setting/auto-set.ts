export const useAutoSetStore = defineStore(
  'autoSet',
  () => {
    const monsterPark = ref({
      enable: false,
      autoSetNum: 0,
      expAdd: 0,
      etcExpAdd: 0,
    });
    const dailyQuest = ref({
      enable: false,
      autoSetNum: 0,
      arcaneExpAdd: 0,
      authenticExpAdd: 0,
    });
    const weeklyQuestAutuSelect = ref(false);

    const monsterParkAddExp = computed(() => {
      const find = MonsterParkExpAddList.find(
        (x) => x.id === monsterPark.value.expAdd,
      );
      if (find) {
        return find.value;
      } else {
        return 0;
      }
    });
    const totalMonsterParkAddExp = computed(() => {
      const isSunday = getIsSunday(new Date());
      const etcExpAdd = monsterPark.value.etcExpAdd || 0;
      return isSunday
        ? 50 + monsterParkAddExp.value + etcExpAdd
        : monsterParkAddExp.value + etcExpAdd;
    });
    const dailyQuestArcaneAddExp = computed(() => {
      const find = MonsterParkExpAddList.find(
        (x) => x.id === dailyQuest.value.arcaneExpAdd,
      );
      if (find) {
        return find.value;
      } else {
        return 0;
      }
    });
    const dailyQuestAuthenticAddExp = computed(() => {
      const find = MonsterParkExpAddList.find(
        (x) => x.id === dailyQuest.value.authenticExpAdd,
      );
      if (find) {
        return find.value;
      } else {
        return 0;
      }
    });
    return {
      monsterPark,
      monsterParkAddExp,
      totalMonsterParkAddExp,
      dailyQuest,
      dailyQuestArcaneAddExp,
      dailyQuestAuthenticAddExp,
      weeklyQuestAutuSelect,
    };
  },
  {
    persist: [
      {
        storage: persistedState.localStorage,
      },
    ],
  },
);
