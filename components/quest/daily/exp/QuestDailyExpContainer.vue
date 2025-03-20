<script setup lang="ts">
import { useAutoSetStore } from '~/store';
import type { CalculatorInput } from '~/type/doping/caculator-input';

const autoSetStore = useAutoSetStore();

const infoList = computed(() => [
  {
    label: '아케인 미션 추가 경험치',
    value: computed(() => autoSetStore.dailyQuestArcaneAddExp),
  },
  {
    label: '어센틱 미션 추가 경험치',
    value: computed(() => autoSetStore.dailyQuestAuthenticAddExp),
  },
]);

const addExpList = ref<CalculatorInput[]>([
  {
    label: '팀 시너지 - 아케인 미션',
    value: computed({
      get() {
        return autoSetStore.dailyQuest.arcaneExpAdd;
      },
      set(value) {
        autoSetStore.dailyQuest.arcaneExpAdd = value;
      },
    }),
    type: 'number',
    inputType: 'select',
    options: MonsterParkExpAddList,
    optionLabel: 'name',
    optionValue: 'id',
  },
  {
    label: '팀 시너지 - 어센틱 미션',
    value: computed({
      get() {
        return autoSetStore.dailyQuest.authenticExpAdd;
      },
      set(value) {
        autoSetStore.dailyQuest.authenticExpAdd = value;
      },
    }),
    type: 'number',
    inputType: 'select',
    options: MonsterParkExpAddList,
    optionLabel: 'name',
    optionValue: 'id',
  },
]);
</script>

<template>
  <div class="quest-daily-exp-container elevation-1">
    <ul class="quest-daily-exp-info">
      <li v-for="info in infoList" :key="info.label">
        <span>{{ info.label }} :</span>
        <span>{{ info.value }}%</span>
      </li>
    </ul>
    <ul>
      <QuestDailyExpInput
        v-for="item in addExpList"
        :key="item.label"
        :item="item"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
div.quest-daily-exp-container {
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
