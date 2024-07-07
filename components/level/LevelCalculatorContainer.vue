<script setup lang="ts">
import { useLevelStore } from '~/store/level';

const levelStore = useLevelStore();
const beforeInfo = computed(() => ({
  title: '계산전 정보',
  level: levelStore.level,
  exp: levelStore.currentExp,
  maxExp: levelStore.currentLevelMaxExp,
  percent: levelStore.currentExpPercent,
}));
const afterInfo = computed(() => ({
  title: '계산후 정보',
  level: levelStore.afterLevel,
  exp: levelStore.afterExp,
  maxExp: levelStore.afterMaxExp,
  percent: levelStore.afterExpPercent,
}));
</script>

<template>
  <section class="level-calculator-container section">
    <div class="header">
      <p>{{ levelStore.viewDate }}</p>
    </div>
    <div>
      <dl>
        <h2>{{ beforeInfo.title }}</h2>
        <dt>LV.{{ beforeInfo.level }}</dt>
        <dd>
          {{ makeComma(beforeInfo.exp) }} / {{ makeComma(beforeInfo.maxExp) }}
        </dd>
        <dd>{{ beforeInfo.percent }}%</dd>
      </dl>
      <div>
        <VProgressLinear :modelValue="beforeInfo.percent" color="success" />
      </div>
    </div>
    <div>
      <dl>
        <h2>{{ afterInfo.title }}</h2>
        <dt>LV.{{ afterInfo.level }}</dt>
        <dd>
          {{ makeComma(afterInfo.exp) }} / {{ makeComma(afterInfo.maxExp) }}
        </dd>
        <dd>{{ afterInfo.percent }}%</dd>
      </dl>
      <div>
        <VProgressLinear :modelValue="afterInfo.percent" color="success" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section.level-calculator-container {
  min-width: 350px;
}
</style>
