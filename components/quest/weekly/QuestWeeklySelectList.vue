<script setup lang="ts">
import { useWeeklyQuestStore } from '~/store';
import type { WeeklyQuestInput } from '~/type/quest/weekly';
const weeklyQuestStore = useWeeklyQuestStore();
defineProps<{
  questList: WeeklyQuestInput[];
}>();
const HEADERS = [
  { label: '퀘스트', class: 'quest-weekly-name' },
  { label: '횟수', class: 'quest-weekly-select' },
  { label: '경험치', class: 'quest-weekly-exp' },
  { label: '퍼센트', class: 'quest-weekly-exp-per' },
];
const totalInfo = computed(() => [
  {
    key: 0,
    label: '합계',
    class: 'quest-weekly-name',
  },
  {
    key: 1,
    label: '',
    class: 'quest-weekly-select',
  },
  {
    key: 2,
    label: makeComma(weeklyQuestStore.totalWeeklyQuestExp),
    class: 'quest-weekly-exp',
  },
  {
    key: 3,
    label: `${weeklyQuestStore.totalWeeklyQuestExpPer}%`,
    class: 'quest-weekly-exp-per',
  },
]);
</script>

<template>
  <table class="quest-weekly-select-list-table common-table">
    <thead>
      <tr>
        <th v-for="header in HEADERS" :key="header.label" :class="header.class">
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <QuestWeeklySelect
        v-for="item in questList"
        :key="item.label"
        :item="item"
      ></QuestWeeklySelect>
      <tr>
        <td v-for="info in totalInfo" :key="info.key" :class="info.class">
          {{ info.label }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@import './QuestWeekly.scss';
table {
  tbody {
    tr {
      &:last-child {
        td {
          padding: 12px 16px !important;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
