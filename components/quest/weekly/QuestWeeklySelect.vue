<script setup lang="ts">
import type { WeeklyQuestInput } from '~/type/quest/weekly';
import type { Option } from '~/type/doping/caculator-input';

defineProps<{
  item: WeeklyQuestInput;
}>();
</script>

<template>
  <tr class="quest-weekly-select">
    <td class="quest-weekly-name">{{ item.label }}</td>
    <td class="quest-weekly-select">
      <div>
        <VSelect
          v-model:model-value="item.value as number"
          :items="item.options as Array<Option>"
          itemTitle="name"
          itemValue="value"
          :disabled="item.disabled as boolean"
          variant="outlined"
          hideDetails
        />
      </div>
    </td>
    <td class="quest-weekly-exp">{{ makeComma(+item.exp) }}</td>
    <td class="quest-weekly-exp-per">{{ item.expPer }}%</td>
  </tr>
</template>

<style scoped lang="scss">
@import './QuestWeekly.scss';
</style>
