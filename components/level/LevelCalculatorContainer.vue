<script setup lang="ts">
import { useLevelStore } from '~/store/level';

const levelStore = useLevelStore();
const infoList = computed(() => {
  const maxExp = getMaxExp(levelStore.level);
  const currentExp = levelStore.isPercent
    ? +Math.round(maxExp * (levelStore.exp / 100)).toFixed(0)
    : levelStore.exp;
  const currentExpPercent = levelStore.isPercent
    ? levelStore.exp
    : Math.round((currentExp / maxExp) * 100).toFixed(3);
  return [
    {
      title: '계산전 정보',
      level: levelStore.level,
      exp: currentExp,
      maxExp: maxExp,
      percent: currentExpPercent,
    },
  ];
});
</script>

<template>
  <section class="level-calculator-container">
    <dl v-for="info in infoList" :key="info.title">
      <h2>{{ info.title }}</h2>
      <dt>LV.{{ info.level }}</dt>
      <dd>{{ makeComma(info.exp) }} / {{ makeComma(info.maxExp) }}</dd>
      <dd>{{ info.percent }}%</dd>
    </dl>
  </section>
</template>

<style scoped lang="scss">
section.level-calculator-container {
}
</style>
