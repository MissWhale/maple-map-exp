import { useLevelStore } from './level';
import { useAutoSetStore } from './setting';

export const useExpCouponStore = defineStore('expCoupon', () => {
  const level = useLevelStore();
  const autoSet = useAutoSetStore();
  const currentExpCoupon = ref<number>(1000);
  const todayGetExpCoupon = ref<number>(0);
  const todayUseExpCoupon = ref<number>(0);
  const useExpCouponInput = ref<number>(0);
  const useExp = ref<number[]>([]);
  const useExpCouponInputHandler = computed({
    get() {
      return useExpCouponInput.value;
    },
    set(value) {
      if (value > currentLevelAvailableExpCoupon.value) {
        useExpCouponInput.value = currentLevelAvailableExpCoupon.value;
      } else if (value < 0) {
        useExpCouponInput.value = 0;
      } else {
        useExpCouponInput.value = +value;
      }
    },
  });
  const currentLevelUpExpCoupon = computed(() => {
    if (level.afterLevel < 200) return 0;
    return Math.ceil(
      (level.afterMaxExp - level.afterExp) / currentLevelExpCoupon.value,
    );
  });
  const currentLevelExpCoupon = computed(() => {
    if (level.afterLevel < 200) return 0;
    if (level.afterLevel > 260) return ExpCouponList[60].exp;
    const findData = ExpCouponList.find((x) => +x.level === +level.afterLevel);
    return findData?.exp || 0;
  });
  const currentLevelAvailableExpCoupon = computed(() => {
    if (currentExpCoupon.value > currentLevelUpExpCoupon.value)
      return currentLevelUpExpCoupon.value;
    else return currentExpCoupon.value;
  });
  const isAvailableUseExpCoupon = computed(() => {
    return currentExpCoupon.value > 0;
  });
  const totalExpCouponExp = computed(() => {
    return useExp.value.reduce((acc, cur) => acc + cur, 0);
  });
  const useExpCoupon = async (count: number) => {
    const exp = currentLevelExpCoupon.value * count;
    const leftExp = await level.afterLevelPlusExp(exp);
    useExp.value.push(leftExp || exp);
    todayUseExpCoupon.value += count;
    currentExpCoupon.value -= count;
    expCouponInputReset();
  };
  const resetTodayUseExpCoupon = () => {
    currentExpCoupon.value += todayUseExpCoupon.value;
    todayUseExpCoupon.value = 0;
    for (let i = useExp.value.length - 1; i >= 0; i--) {
      level.afterLevelMinusExp(useExp.value[i]);
      useExp.value.pop();
    }
    expCouponInputReset();
  };
  const expCouponInputReset = () => {
    if (autoSet.expCouponAutoSelect && currentExpCoupon.value > 0) {
      useExpCouponInput.value = currentLevelAvailableExpCoupon.value;
    }
    if (currentExpCoupon.value === 0) {
      useExpCouponInput.value = 0;
    }
  };
  onMounted(() => {
    expCouponInputReset();
  });
  return {
    currentExpCoupon,
    todayGetExpCoupon,
    todayUseExpCoupon,
    useExpCouponInput,
    useExpCouponInputHandler,
    currentLevelUpExpCoupon,
    currentLevelExpCoupon,
    currentLevelAvailableExpCoupon,
    isAvailableUseExpCoupon,
    totalExpCouponExp,
    useExp,
    useExpCoupon,
    resetTodayUseExpCoupon,
    expCouponInputReset,
  };
});
