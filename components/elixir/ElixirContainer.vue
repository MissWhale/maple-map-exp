<script setup lang="ts">
import { useElixirStore, useLevelStore } from '~/store';
import type { ElixirInfo } from '~/type/elixir';

const elixirStore = useElixirStore();
const levelStore = useLevelStore();
const inputList = ref<ElixirInfo[]>(
  elixirStore.elixir.map((x) => {
    const currentLevelMaxExp = getMaxExp(levelStore.level);
    const useExp = computed(() =>
      levelStore.level <= x.endLevel ? currentLevelMaxExp : x.exp,
    );
    const useExpPer = computed(() => {
      const per = useExp.value / currentLevelMaxExp;
      return +(per * 100).toFixed(3);
    });
    return {
      ...x,
      valueCount: computed({
        get() {
          return x.count;
        },
        set(value) {
          x.count = value;
        },
      }),
      useExp,
      useExpPer,
    };
  }),
);
function resetClick() {
  elixirStore.elixir.forEach((x) => {
    x.count = 0;
  });
}
</script>

<template>
  <section class="elixir-container">
    <div class="elixir-container-header">
      <p>성장의 비약</p>
      <VBtn color="error" @click="resetClick">초기화</VBtn>
    </div>
    <ElixirList :elixirList="inputList" />
  </section>
</template>

<style scoped lang="scss">
section.elixir-container {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  padding: 16px;
  div.elixir-container-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p {
      font-size: 20px;
      font-weight: bold;
    }
  }
  ul {
    width: 400px;
  }
}
</style>
