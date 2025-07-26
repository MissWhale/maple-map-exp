export interface Hunt {
  id?: number;
  mapId: number;
  huntCount: number;
  huntTime: number;
  huntTotalTime: number;
  boostCount: number;
  boostMobCount: number;
  eventCount: number;
}
// 이벤트 스킬 몹 exp * 135
export const useHuntStore = defineStore('huntStore', () => {
  const DEFAULT_HUNT: Hunt = {
    mapId: 1,
    huntCount: 0,
    huntTime: 0,
    huntTotalTime: 0,
    boostCount: 0,
    boostMobCount: 0,
    eventCount: 0,
  };
  const huntList = ref<Hunt[]>([]);
  function addHunt() {
    if (huntList.value.length === 0) {
      huntList.value.push({ ...DEFAULT_HUNT, id: 1 });
      return 0;
    } else {
      const max = huntList.value.reduce((prev, curr) =>
        prev.id! > curr.id! ? prev : curr,
      );
      const id = max.id! + 1;
      huntList.value.push({ ...DEFAULT_HUNT, id });
      return id - 1;
    }
  }
  function deleteHunt(id: number) {
    const findIndex = huntList.value.findIndex((h) => h.id === id);
    if (findIndex !== -1) {
      huntList.value.splice(findIndex, 1);
    }
  }
  function resetHunt() {
    huntList.value = [];
  }
  return { huntList, addHunt, deleteHunt, resetHunt };
});
