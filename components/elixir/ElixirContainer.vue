<script setup lang="ts">
import { useElixirStore, useLevelStore } from '~/store';
import type { ElixirInfo } from '~/type/elixir';

const elixirStore = useElixirStore();
const levelStore = useLevelStore();
const inputList = ref<ElixirInfo[]>(
  elixirStore.elixir.map((x) => {
    const currentLevelMaxExp = computed(() => getMaxExp(levelStore.afterLevel));
    const useExp = computed(() =>
      levelStore.afterLevel > 299
        ? 0
        : levelStore.afterLevel <= x.endLevel
          ? currentLevelMaxExp.value
          : x.exp,
    );
    const useExpPer = computed(() => {
      if (levelStore.afterLevel > 299) return 0;
      const per = useExp.value / currentLevelMaxExp.value;
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
          elixirStore.useElixir(useExp.value);
        },
      }),
      disabled: computed(
        () =>
          levelStore.afterLevel > 299 || x.startLevel > levelStore.afterLevel,
      ),
      useExp,
      useExpPer,
    };
  }),
);
function resetClick() {
  elixirStore.elixir.forEach((x) => {
    x.count = 0;
  });
  elixirStore.resetTodayUseElixir();
}
</script>

<template>
  <section class="elixir-container section">
    <div class="elixir-container-header header">
      <p>성장의 비약</p>
      <VBtn color="error" @click="resetClick">초기화</VBtn>
    </div>
    <ElixirList :elixirList="inputList" />
  </section>
</template>

<style scoped lang="scss">
section.elixir-container {
  // display: flex;
  // flex-direction: column;
  // row-gap: 16px;
  // border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  // border-radius: 8px;
  // padding: 16px;
  // div.elixir-container-header {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   p {
  //     font-size: 20px;
  //     font-weight: bold;
  //   }
  // }
  ul {
    width: 340px;
  }
}
</style>
