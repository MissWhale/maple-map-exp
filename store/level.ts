export const useLevelStore = defineStore('level', () => {
  const level = ref(200);
  // const targetLevel = ref(0);
  const date = ref(new Date());
  const burning = ref(0);
  const isPercent = ref(true);
  const exp = ref(0);
  const expCoupon = ref(0);
  const maxExp = computed(() => {
    return isPercent.value ? 99.999 : getMaxExp(level.value) - 1;
  });
  return {
    level,
    // targetLevel,
    date,
    burning,
    isPercent,
    exp,
    expCoupon,
    maxExp,
  };
});
