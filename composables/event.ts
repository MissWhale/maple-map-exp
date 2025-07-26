import { useHuntStore, useLevelStore } from '~/store';
import type { MobInfo } from '~/type/hunt/hunt.mob.type';

export const useEvent = (id: number, mobInfo: MobInfo[]) => {
  const huntStore = useHuntStore();
  const levelStore = useLevelStore();
  const { totalHuntCount } = useHuntTime(id);
  const eventCount = computed({
    get() {
      return huntStore.huntList[id].eventCount || 0;
    },
    set(value) {
      if (+value > availableEventCount.value) {
        value = availableEventCount.value;
      }
      console.log(value);
      huntStore.huntList[id].eventCount = +value;
    },
  });
  const availableEventCount = computed(() => {
    return Math.ceil(totalHuntCount.value / 300);
  });
  const eventOneExp = computed(() => {
    const min = mobInfo.reduce((acc, cur) => {
      return acc.dopingExp < cur.dopingExp ? acc : cur;
    });
    return min.dopingExp * 135;
  });
  const eventOneExpPer = computed(() => {
    const levelExp = getMaxExp(levelStore.level);
    return ((eventOneExp.value / levelExp) * 100).toFixed(3);
  });
  const eventCountExp = computed(() => {
    return eventOneExp.value * +eventCount.value;
  });
  const eventCountExpPer = computed(() => {
    const levelExp = getMaxExp(levelStore.level);
    return ((eventCountExp.value / levelExp) * 100).toFixed(3);
  });

  return {
    eventCount,
    eventOneExp,
    eventOneExpPer,
    eventCountExp,
    eventCountExpPer,
    availableEventCount,
  };
};
