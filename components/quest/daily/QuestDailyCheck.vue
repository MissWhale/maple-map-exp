<script setup lang="ts">
import type { DailyQuestInput } from '~/type/quest/daily';

defineProps<{
  quest: DailyQuestInput;
}>();
</script>

<template>
  <tr class="quest-daily-check">
    <td class="quest-daily-check-input">
      <div>
        <VCheckbox
          v-model="quest.value"
          color="primary"
          hide-details
          :disabled="quest.disabled as boolean"
        ></VCheckbox>
      </div>
    </td>
    <td class="quest-daily-check-name">{{ quest.label }}</td>
    <td class="quest-daily-check-exp">{{ makeComma(+quest.exp) }}</td>
    <td class="quest-daily-check-exp-per">{{ quest.expPer }}%</td>
  </tr>
</template>

<style scoped lang="scss">
@import './QuestDaily.scss';
</style>
