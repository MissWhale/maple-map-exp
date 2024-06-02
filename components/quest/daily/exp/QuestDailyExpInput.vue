<script setup lang="ts">
import type { CalculatorInput, Option } from '~/type/doping/caculator-input';

defineProps<{
  item: CalculatorInput;
}>();
</script>

<template>
  <li class="quest-daily-exp-input">
    <div class="label">{{ item.label }}</div>
    <div class="input">
      <VSelect
        v-model:model-value="item.value"
        :items="item.options as Array<Option>"
        :itemTitle="item.optionLabel"
        :itemValue="item.optionValue"
        variant="outlined"
        hideDetails
        block
      />
    </div>
  </li>
</template>

<style scoped lang="scss">
li.quest-daily-exp-input {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 6px;
  div {
    width: 100%;
  }
}
</style>
