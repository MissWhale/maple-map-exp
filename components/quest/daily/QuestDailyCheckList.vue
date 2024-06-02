<script setup lang="ts">
import { useDailyQuestStore } from '~/store';
import type { DailyQuestInput } from '~/type/quest/daily';
const dailyQuestStore = useDailyQuestStore();
defineProps<{
  questList: DailyQuestInput[];
}>();
const HEADERS = [
  { label: '', class: 'quest-daily-check-input' },
  { label: '지역', class: 'quest-daily-area' },
  { label: '경험치', class: 'quest-daily-exp' },
  { label: '퍼센트', class: 'quest-daily-exp-per' },
];
const totalInfo = computed(() => [
  {
    key: 0,
    label: '',
    class: 'quest-daily-check-input',
  },
  {
    key: 1,
    label: '합계',
    class: 'quest-daily-area',
  },
  {
    key: 2,
    label: makeComma(dailyQuestStore.totalDailyQuestExp),
    class: 'quest-daily-exp',
  },
  {
    key: 3,
    label: `${dailyQuestStore.totalDailyQuestExpPer}%`,
    class: 'quest-daily-exp-per',
  },
]);
</script>

<template>
  <table class="daily-quest-check-list-table common-table">
    <thead>
      <tr>
        <th v-for="header in HEADERS" :key="header.label" :class="header.class">
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <QuestDailyCheck
        v-for="quest in questList"
        :key="quest.label"
        :quest="quest"
      ></QuestDailyCheck>
      <tr>
        <td v-for="info in totalInfo" :key="info.key" :class="info.class">
          {{ info.label }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@import './QuestDaily.scss';
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
