export interface Hunt {
  id: number;
  mapId: number;
  huntCount: number;
  huntTime: number;
  huntTotalTime: number;
  busterCount: number;
  busterMobCount: number;
  eventCount: number;
}
// 이벤트 스킬 몹 exp * 135
export const useHuntStore = defineStore('huntStore', () => {
  const huntList = ref<Hunt[]>([]);
  function addHunt(hunt: Hunt) {
    huntList.value.push(hunt);
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
