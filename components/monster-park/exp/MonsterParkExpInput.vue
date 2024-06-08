<script setup lang="ts">
import type { CalculatorInput, Option } from '~/type/doping/caculator-input';

defineProps<{
  item: CalculatorInput;
}>();
function inputBlur(item: CalculatorInput) {
  if (item.type === 'number' && String(item.value) === '') {
    item.value = item.min || 0;
  }
}
</script>

<template>
  <li class="monster-park-exp-input">
    <div class="label">{{ item.label }}</div>
    <div class="input">
      <template v-if="item.inputType === 'select'">
        <VSelect
          v-model:model-value="item.value"
          :items="item.options as Array<Option>"
          :itemTitle="item.optionLabel"
          :itemValue="item.optionValue"
          variant="outlined"
          hideDetails
          block
        />
      </template>
      <template v-else-if="item.inputType === 'input'">
        <VTextField
          v-model:model-value="item.value"
          :type="item.type"
          :max="item.max"
          min="0"
          :step="item.step"
          suffix="%"
          color="primary"
          variant="outlined"
          hideDetails
          block
          @blur="inputBlur(item)"
        />
      </template>
    </div>
  </li>
</template>

<style scoped lang="scss">
li.monster-park-exp-input {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 6px;
  div {
    width: 100%;
  }
}
</style>
