<script setup lang="ts">
import type { CalculatorInput } from '~/type/doping/caculator-input';

const props = defineProps<{
  list: Array<CalculatorInput>;
}>();

const infoList = computed(() => [
  {
    label: '일요일',
    value: getIsSunday(new Date()) ? 50 : 0,
  },
  {
    label: '팀 시너지',
    value:
      MonsterParkExpAddList.find((x) => x.id === props.list[0].value)?.value ||
      0,
  },
  {
    label: '그 외',
    value: props.list[1].value || 0,
  },
]);
</script>

<template>
  <div class="monster-park-exp-container elevation-1">
    <ul class="monster-park-exp-info">
      <li v-for="info in infoList" :key="info.label">
        <span>{{ info.label }} :</span>
        <span>{{ info.value }}%</span>
      </li>
    </ul>
    <ul>
      <MonsterParkExpInput v-for="item in list" :item="item" />
    </ul>
  </div>
</template>

<style scoped lang="scss">
div.monster-park-exp-container {
  background: rgba(var(--v-theme-background));
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  ul {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    &.monster-park-exp-info {
      li {
        display: flex;
        column-gap: 4px;
      }
    }
  }
}
</style>
