import { useLevelStore } from './level';
import { useAutoSetStore } from './setting';

export const useMonsterParkStore = defineStore('monsterPark', () => {
  const autoSetStore = useAutoSetStore();
  const levelStore = useLevelStore();
  const monsterParkList = ref<Array<number | boolean | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    false,
  ]);
  const totalMonsterParkExp = computed(() => {
    const exp = monsterParkList.value.reduce((acc: number, cur, i) => {
      if (i === 7) {
        if (cur === false || cur === null) {
          return acc;
        }
        const exp =
          getExtreamMonsterParkExp(levelStore.level) *
          (1 + autoSetStore.totalMonsterParkAddExp / 100);
        return +acc! + exp;
      } else {
        if (cur === null) {
          return acc;
        }
        const data = MonsterPark.find((y) => y.key === cur);
        if (data === undefined) {
          return acc;
        }
        return (
          +acc! + data.exp * (1 + autoSetStore.totalMonsterParkAddExp / 100)
        );
      }
    }, 0);
    return Math.round(exp || 0);
  });
  const totalMonsterParkExpPer = computed(() =>
    ((totalMonsterParkExp.value / getMaxExp(levelStore.level)) * 100).toFixed(
      3,
    ),
  );
  return {
    monsterParkList,
    totalMonsterParkExp,
    totalMonsterParkExpPer,
  };
});
