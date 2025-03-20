<script setup lang="ts">
import type { CalculatorInput } from '~/type/doping/caculator-input';

defineProps({
  item: {
    type: Object as PropType<CalculatorInput>,
    required: true,
  },
});
</script>

<template>
  <tr>
    <td class="doping-input-label">
      <span>{{ item.label }}</span>
    </td>
    <td class="doping-input">
      <div v-if="item.inputType === 'select'" :key="item.label">
        <VSelect
          v-model:model-value="item.value"
          :items="item.options"
          :itemTitle="item.optionLabel"
          :itemValue="item.optionValue"
          variant="outlined"
          hideDetails
        />
      </div>
      <div v-else>
        <VTextField
          v-model:model-value="item.value"
          :type="item.type"
          :max="item.max"
          :step="item.step"
          color="primary"
          variant="outlined"
          hideDetails
          block
        />
      </div>
    </td>
    <td class="doping-input-value">{{ item.viewValue || item.value }}%</td>
  </tr>
</template>

<style scoped lang="scss">
@import './Doping.scss';
tr {
  td.doping-input {
    & > div {
      display: flex;
      width: 100%;
      flex-direction: column;
    }
  }
}
</style>
