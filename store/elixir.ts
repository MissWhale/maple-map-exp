import { useLevelStore } from './level';

export const useElixirStore = defineStore('elixir', () => {
  const level = useLevelStore();
  const elixir = ref(Elixir.map((x) => ({ ...x, count: 0 })));
  const useExp = ref<number[]>([]);
  const totalElixirExp = computed(() => {
    return useExp.value.reduce((acc, cur) => acc + cur, 0);
  });
  const useElixir = async (exp: number) => {
    await level.afterLevelPlusExp(exp);
    useExp.value.push(exp);
  };
  const resetTodayUseElixir = () => {
    for (let i = useExp.value.length - 1; i >= 0; i--) {
      level.afterLevelMinusExp(useExp.value[i]);
      useExp.value.pop();
    }
  };
  return {
    elixir,
    useExp,
    useElixir,
    resetTodayUseElixir,
    totalElixirExp,
  };
});
