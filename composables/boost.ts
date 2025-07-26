import { useHuntStore, useLevelStore } from '~/store';
import type { MobInfo } from '~/type/hunt/hunt.mob.type';

export const useBoost = (id: number, mobInfo: MobInfo[]) => {
  const huntStore = useHuntStore();
  const levelStore = useLevelStore();
  const boostCount = computed({
    get() {
      return huntStore.huntList[id].boostCount || 0;
    },
    set(value) {
      if (value > 10) value = 10;
      huntStore.huntList[id].boostCount = +value;
    },
  });
  const boostMobCount = computed({
    get() {
      return huntStore.huntList[id].boostMobCount || 0;
    },
    set(value) {
      if (value > 180) value = 180;
      huntStore.huntList[id].boostMobCount = +value;
    },
  });
  const boostMobExp = computed(() => {
    const min = mobInfo.reduce((acc, cur) =>
      acc.nonLevelDopingExp < cur.nonLevelDopingExp ? acc : cur,
    );
    return min.nonLevelDopingExp;
  });
  const boostMobOneExp = computed(() => {
    return boostMobExp.value * boostMobCount.value;
  });
  const boostMobOneExpPer = computed(() => {
    const levelExp = getMaxExp(levelStore.level);
    return ((boostMobOneExp.value / levelExp) * 100).toFixed(3);
  });
  const boostMobTotalExp = computed(() => {
    return boostMobOneExp.value * boostCount.value;
  });
  const boostMobTotalExpPer = computed(() => {
    const levelExp = getMaxExp(levelStore.level);
    return ((boostMobTotalExp.value / levelExp) * 100).toFixed(3);
  });
  return {
    boostCount,
    boostMobCount,
    boostMobExp,
    boostMobOneExp,
    boostMobOneExpPer,
    boostMobTotalExp,
    boostMobTotalExpPer,
  };
};
