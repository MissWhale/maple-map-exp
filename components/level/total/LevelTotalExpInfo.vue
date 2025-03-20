<script setup lang="ts">
type LevelTotalExpInfo = {
  title: string;
  exp: number | ComputedRef<number>;
  percent: number | ComputedRef<number>;
};
defineProps<LevelTotalExpInfo>();
</script>

<template>
  <tr class="level-total-exp-info">
    <td class="contents">{{ title }}</td>
    <td class="exp">{{ makeComma(exp) }}</td>
    <td class="percent">{{ percent }}%</td>
  </tr>
</template>

<style scoped lang="scss">
@import './LevelTotalExp.scss';
</style>
