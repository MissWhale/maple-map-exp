export const useElixirStore = defineStore('elixir', () => {
  const elixir = ref(Elixir.map((x) => ({ ...x, count: 0 })));
  return {
    elixir,
  };
});
