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
  const activeMonsterParkSelectList = computed(() =>
    MonsterPark.filter((x) => {
      const type = MonsterParkType.find(
        (y) => y.min <= levelStore.level && levelStore.level < y.max,
      );
      if (type) {
        const isLevelBetween = levelStore.level >= x.min;
        return x.type === type.key && isLevelBetween;
      } else false;
    })
      .map((x) => {
        const defaultLabel = `${x.name} (${x.min} ~ ${x.max})`;
        if (x.arc) {
          const label = `${defaultLabel} 포스 : ${makeComma(x.arc)}`;
          return {
            ...x,
            name: label,
            value: x.key,
          };
        } else {
          return {
            ...x,
            name: defaultLabel,
            value: x.key,
          };
        }
      })
      .reverse(),
  );
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
  const monsterParkReset = () => {
    const isDefault = monsterParkList.value.every((x, i) => {
      if (i === 7) return x === false;
      return x === null;
    });
    if (isDefault) {
      return;
    }
    monsterParkList.value = [null, null, null, null, null, null, null, false];
  };
  const runMonsterPark = (num: number) => {
    const maxExp = activeMonsterParkSelectList.value.reduce((prev, curr) =>
      prev.exp > curr.exp ? prev : curr,
    );
    range(0, num).forEach((x) => {
      monsterParkList.value[x] = maxExp.key;
    });
    range(num, 6).forEach((x) => {
      monsterParkList.value[x] = null;
    });
  };
  watch(
    () => levelStore.level,
    () => monsterParkReset(),
  );
  watch(totalMonsterParkExp, async (newVal, oldVal) => {
    await levelStore.afterLevelMinusExp(oldVal);
    await levelStore.afterLevelPlusExp(newVal);
  });
  return {
    monsterParkList,
    activeMonsterParkSelectList,
    totalMonsterParkExp,
    totalMonsterParkExpPer,
    monsterParkReset,
    runMonsterPark,
  };
});
