<script setup lang="ts">
import { useMonsterParkStore } from '~/store';
import type { MonsterParkInput } from '~/type/monster-park';
const monsterParkStore = useMonsterParkStore();
defineProps<{
  list: MonsterParkInput[];
}>();
const HEADERS = [
  { label: '던전명', class: 'monster-park-select' },
  { label: '경험치', class: 'monster-park-input-exp' },
  { label: '퍼센트', class: 'monster-park-input-exp-per' },
];
</script>

<template>
  <table class="monster-park-input-list-table">
    <thead>
      <tr>
        <th v-for="header in HEADERS" :key="header.label">
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody class="monster-park-input-list">
      <MonsterParkInput
        v-for="input in list"
        :key="input.label"
        :input="input"
      />
      <tr>
        <td class="monster-park-select">합계</td>
        <td class="monster-park-input-exp">
          {{ monsterParkStore.totalMonsterParkExp }}
        </td>
        <td class="monster-park-input-exp-per">
          {{ monsterParkStore.totalMonsterParkExpPer }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
@import './MonsterPark.scss';
table.monster-park-input-list-table {
  width: 100%;
  th {
    height: 40px;
    font-weight: 500;
  }
  tbody {
    tr {
      &:last-child {
        height: 40px;
        font-weight: 500;
        border: none;
      }
    }
  }
}
</style>
