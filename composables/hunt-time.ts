import { useHuntStore } from '~/store';

export const useHuntTime = (id: number) => {
  const huntStore = useHuntStore();
  const minuteCount = computed(() => {
    return (
      huntStore.huntList[id].huntCount / huntStore.huntList[id].huntTime || 0
    );
  });
  const totalHuntCount = computed(() => {
    return minuteCount.value * huntStore.huntList[id].huntTotalTime || 0;
  });
  return {
    minuteCount,
    totalHuntCount,
  };
};
