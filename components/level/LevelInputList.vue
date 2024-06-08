<script setup lang="ts">
import type { CalculatorInput, Option } from '~/type/doping/caculator-input';
defineProps({
  item: {
    type: Object as PropType<CalculatorInput>,
    required: true,
  },
});
function inputBlur(item: CalculatorInput) {
  if (item.type === 'number' && String(item.value) === '') {
    item.value = item.min || 0;
  }
}
</script>

<template>
  <dt class="level-input-title">
    <span>{{ item.label }}</span>
  </dt>
  <dd class="level-input">
    <template v-if="item.inputType === 'select'">
      <VSelect
        v-model:model-value="item.value"
        :items="item.options as Array<Option>"
        :itemTitle="item.optionLabel"
        :itemValue="item.optionValue"
        variant="outlined"
        hideDetails
      />
    </template>
    <template v-else-if="item.inputType === 'input'">
      <VTextField
        v-model:model-value="item.value"
        :type="item.type"
        :max="item.max"
        min="0"
        :step="item.step"
        :suffix="item.suffix as string"
        color="primary"
        variant="outlined"
        hideDetails
        block
        @blur="inputBlur(item)"
      />
    </template>
    <template v-else-if="item.inputType === 'switch'">
      <VSwitch
        v-model:model-value="item.value"
        color="primary"
        variant="outlined"
        hideDetails
        block
        inset
      />
    </template>
  </dd>
</template>

<style scoped lang="scss">
dt.level-input-title {
}
dd.level-input {
}
</style>
