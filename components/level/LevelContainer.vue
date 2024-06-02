<script setup lang="ts">
import { useLevelStore } from '~/store/level';
import type { CalculatorInput } from '~/type/doping/caculator-input';

const levelStore = useLevelStore();
const inputList = ref<CalculatorInput[]>([
  {
    label: '레벨',
    value: computed({
      get() {
        return levelStore.level;
      },
      set(value: number) {
        if (value < 1) value = 1;
        if (value > 299) value = 299;
        levelStore.level = value;
      },
    }),
    type: 'number',
    inputType: 'input',
    min: 1,
    max: 299,
  },
  // {
  //   label: '목표레벨',
  //   value: computed({
  //     get() {
  //       return levelStore.targetLevel;
  //     },
  //     set(value: number) {
  //       if (value < 1) value = 1;
  //       if (value > 299) value = 299;
  //       levelStore.targetLevel = value;
  //     },
  //   }),
  //   type: 'number',
  //   inputType: 'input',
  //   min: 1,
  //   max: 299,
  // },
  {
    label: '버닝',
    value: computed({
      get() {
        return levelStore.burning;
      },
      set(value) {
        levelStore.burning = value;
      },
    }),
    type: 'number',
    inputType: 'select',
    options: burningList,
    optionLabel: 'name',
    optionValue: 'value',
  },
  {
    label: '%로 입력',
    value: computed({
      get() {
        return levelStore.isPercent;
      },
      set(value: boolean) {
        levelStore.exp = 0;
        levelStore.isPercent = value;
      },
    }),
    type: 'number',
    inputType: 'switch',
  },
  {
    label: '현재 경험치',
    value: computed({
      get() {
        return levelStore.exp;
      },
      set(value: number) {
        if (levelStore.isPercent) {
          if (value < 0) value = 0;
          if (value > 99.999) value = levelStore.maxExp;
        } else {
          if (value > levelStore.maxExp) value = levelStore.maxExp;
        }
        levelStore.exp = +(+value).toFixed(levelStore.isPercent ? 3 : 0);
      },
    }),
    type: 'number',
    inputType: 'input',
    max: levelStore.maxExp,
    prefix: levelStore.isPercent ? 3 : 0,
    step: levelStore.isPercent ? 0.001 : 1,
    min: 0,
  },
  {
    label: 'EXP 쿠폰',
    value: computed({
      get() {
        return levelStore.expCoupon;
      },
      set(value: number) {
        if (value < 0) value = 0;
        levelStore.expCoupon = value;
      },
    }),
    type: 'number',
    inputType: 'input',
    min: 0,
  },
]);
</script>

<template>
  <section class="level-container-section">
    <!-- {{ levelStore }} -->
    <p>시작 정보</p>
    <!-- {{ MonsterParkExpAddList }} -->
    <dl class="level-input-list">
      <LevelInputList
        v-for="input in inputList"
        :key="input.label"
        :item="input"
      />
    </dl>
  </section>
</template>

<style scoped lang="scss">
section.level-container-section {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  padding: 16px;
  p {
    font-size: 20px;
    font-weight: bold;
  }
  dl {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
    gap: 12px;
  }
}
</style>
