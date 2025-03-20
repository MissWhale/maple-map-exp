<script setup lang="ts">
import { useAutoSetStore, useLevelStore, useDailyQuestStore } from '~/store';
import type { DailyQuestInput } from '~/type/quest/daily';

const levelStore = useLevelStore();
const dailyQuest = useDailyQuestStore();
const autoSet = useAutoSetStore();
const inputList = ref<DailyQuestInput[]>(
  dailyQuest.dailyQuest.map((quest) => ({
    label: quest.name,
    value: computed({
      get() {
        return quest.isCheck;
      },
      set(value) {
        quest.isCheck = value;
      },
    }),
    inputType: 'checkbox',
    type: 'boolean',
    exp: computed(() => {
      if (quest.isCheck) {
        if (quest.continent === 0) {
          return Math.round(
            quest.exp * (1 + autoSet.dailyQuestArcaneAddExp / 100),
          );
        } else if (quest.continent === 2) {
          return Math.round(
            quest.exp * (1 + autoSet.dailyQuestAuthenticAddExp / 100),
          );
        }
        return quest.exp;
      }
      return 0;
    }),
    expPer: computed(() => {
      if (quest.isCheck) {
        const currentLevelMaxExp = getMaxExp(levelStore.level);
        if (quest.continent === 0) {
          return +(
            ((quest.exp * (1 + autoSet.dailyQuestArcaneAddExp / 100)) /
              currentLevelMaxExp) *
            100
          ).toFixed(3);
        } else if (quest.continent === 2) {
          return +(
            ((quest.exp * (1 + autoSet.dailyQuestAuthenticAddExp / 100)) /
              currentLevelMaxExp) *
            100
          ).toFixed(3);
        }
        return +((quest.exp / currentLevelMaxExp) * 100).toFixed(3);
      }
      return 0;
    }),
    disabled: computed(() => levelStore.level < quest.min),
    continent: quest.continent,
  })),
);

const isQuestDailyDisabled = computed(() => levelStore.level < 200);
const continentClick = (continent: number) => {
  inputList.value.forEach((x) => {
    if (x.continent === continent && !x.disabled) {
      x.value = true;
    }
  });
};

const addExpMenu = ref(false);
const menuText = computed(() => {
  return `추가경험치 ${autoSet.dailyQuestArcaneAddExp}% / ${autoSet.dailyQuestAuthenticAddExp}%`;
});

const resetClick = () => {
  dailyQuest.dailyQuestReset();
};
</script>

<template>
  <section class="quest-daily-container section">
    <div class="quest-daily-container-header header">
      <p>일일 퀘스트</p>
    </div>
    <div class="quest-daily-container-actions actions">
      <VMenu :disabled="isQuestDailyDisabled">
        <template #activator="{ props }">
          <VBtn color="blue-lighten-4" v-bind="props">지역선택</VBtn>
        </template>
        <VList>
          <VListItem
            v-for="data in Continent"
            :key="data.continent"
            @click="continentClick(data.continent)"
            >{{ data.name }}</VListItem
          >
        </VList>
      </VMenu>
      <VMenu v-model="addExpMenu" :close-on-content-click="false">
        <template #activator="{ props }">
          <VBtn color="blue-lighten-5" v-bind="props">{{ menuText }}</VBtn>
        </template>
        <QuestDailyExpContainer />
      </VMenu>
      <VBtn color="error" @click="resetClick">초기화</VBtn>
    </div>
    <QuestDailyCheckList :questList="inputList"></QuestDailyCheckList>
  </section>
</template>

<style scoped lang="scss">
section.quest-daily-container {
  min-width: 500px;
  div.actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 8px;
  }
}
</style>
