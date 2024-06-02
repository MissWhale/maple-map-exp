<script setup lang="ts">
import {
  useAutoSetStore,
  useLevelStore,
  useDailyQuestStore,
  useWeeklyQuestStore,
} from '~/store';
import type { DailyQuestInput } from '~/type/quest/daily';
import type { WeeklyQuestInput } from '~/type/quest/weekly';

const levelStore = useLevelStore();
const weeklyQuest = useWeeklyQuestStore();
const autoSet = useAutoSetStore();
const inputList = ref<WeeklyQuestInput[]>(
  weeklyQuest.weeklyQuest.map((quest) => ({
    label: quest.name,
    value: computed({
      get() {
        return quest.count;
      },
      set(value) {
        quest.count = value;
      },
    }),
    inputType: 'select',
    type: 'number',
    options: [
      { name: '0', value: 0 },
      { name: '1', value: 1 },
      { name: '2', value: 2 },
      { name: '3', value: 3 },
    ],
    exp: computed(() => {
      if (quest.count) {
        return quest.exp * quest.count;
      }
      return 0;
    }),
    expPer: computed(() => {
      if (quest.count) {
        const currentLevelMaxExp = getMaxExp(levelStore.level);
        return +(
          ((quest.exp * quest.count) / currentLevelMaxExp) *
          100
        ).toFixed(3);
      }
      return 0;
    }),
    disabled: computed(() => levelStore.level < quest.min),
    skipLevel1: quest.skipLevel1,
    skipLevel2: quest.skipLevel2,
    min: quest.min,
  })),
);

const autoSelectButtonName = computed(() => {
  return autoSet.weeklyQuestAutuSelect ? '자동선택 해제' : '자동선택 설정';
});
const autoSelectButtonColor = computed(() => {
  return autoSet.weeklyQuestAutuSelect ? 'warning' : 'success';
});
const autoSelectClick = () => {
  autoSet.weeklyQuestAutuSelect = !autoSet.weeklyQuestAutuSelect;
};

const resetClick = () => {
  weeklyQuest.resetWeeklyQuest();
};
</script>

<template>
  <section class="quest-weekly-container section">
    <div class="quest-weekly-container-header header">
      <p>주간 퀘스트</p>
    </div>
    <div class="quest-weekly-container-actions actions">
      <VBtn :color="autoSelectButtonColor" @click="autoSelectClick">{{
        autoSelectButtonName
      }}</VBtn>
      <VBtn color="error" @click="resetClick">초기화</VBtn>
    </div>
    <QuestWeeklySelectList :questList="inputList"></QuestWeeklySelectList>
  </section>
</template>

<style scoped lang="scss">
section.quest-weekly-container {
  min-width: 500px;
  div.actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 8px;
  }
}
</style>
