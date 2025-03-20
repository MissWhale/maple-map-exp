import { useExpCouponStore } from './exp-coupon';

export const useLevelStore = defineStore('level', () => {
  const expCouponStore = useExpCouponStore();
  const level = ref(200);
  const date = ref(new Date());
  const burning = ref(0);
  const isPercent = ref(true);
  const exp = ref(0);
  const maxExp = computed(() => {
    return isPercent.value ? 99.999 : getMaxExp(level.value) - 1;
  });
  const currentLevelMaxExp = computed(() => getMaxExp(level.value));
  const currentExp = computed(() =>
    isPercent.value
      ? +Math.round(currentLevelMaxExp.value * (exp.value / 100)).toFixed(0)
      : exp.value,
  );
  const currentExpPercent = computed(() =>
    isPercent.value
      ? exp.value
      : +(
          Math.round((currentExp.value / maxExp.value) * 100000) / 1000
        ).toFixed(3),
  );
  const viewDate = computed(() => dateFormat(date.value));
  const afterLevel = ref(200);
  const afterExp = ref(0);
  const afterMaxExp = computed(() => getMaxExp(afterLevel.value));
  const afterExpPercent = computed(() => {
    return afterLevel.value < 300
      ? +(
          Math.round((afterExp.value / afterMaxExp.value) * 100000) / 1000
        ).toFixed(3)
      : 100;
  });
  const afterLevelPlusExp = async (exp: number) => {
    const plusExp = exp + afterExp.value;
    if (afterLevel.value > 299) return 0;
    if (plusExp >= afterMaxExp.value) {
      const leftExp = plusExp - afterMaxExp.value;
      if (afterLevel.value >= 299) {
        afterLevel.value = 300;
        afterExp.value = 0;
        return exp - leftExp;
      }
      afterLevel.value += 1;
      afterExp.value = leftExp;
    } else {
      afterExp.value = plusExp;
    }
    return 0;
  };
  const afterLevelMinusExp = async (exp: number) => {
    let tempLevel = afterLevel.value;
    let totalExp = getTotalExp(tempLevel) + afterExp.value;
    let minus = totalExp - exp;
    if (exp < 1) return;
    if (tempLevel > 299) {
      afterLevel.value = 299;
      afterExp.value = getMaxExp(299) - exp;
      return;
    }
    let index = LevelExp.findLastIndex((item) => item.totalExp <= minus);
    if (index > -1) {
      let info = LevelExp[index];
      if (info) {
        if (info.exp === minus - info.totalExp) {
          afterLevel.value = info.level + 1;
          afterExp.value = 0;
          return;
        }
        afterLevel.value = info.level;
        afterExp.value = minus - info.totalExp;
      }
    }
  };
  watch(currentExp, () => {
    afterExp.value = currentExp.value;
    expCouponStore.expCouponInputReset();
  });
  watch(afterLevel, () => {
    expCouponStore.expCouponInputReset();
  });
  return {
    level,
    date,
    burning,
    isPercent,
    exp,
    maxExp,
    currentLevelMaxExp,
    currentExp,
    currentExpPercent,
    afterLevel,
    afterExp,
    afterMaxExp,
    afterExpPercent,
    afterLevelPlusExp,
    afterLevelMinusExp,
    viewDate,
  };
});
