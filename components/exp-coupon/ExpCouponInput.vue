<script setup lang="ts">
import type { CalculatorInput } from '~/type/doping/caculator-input';
const emits = defineEmits(['apply']);
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
  <li class="exp-coupon-input">
    <div class="exp-coupon-input-label">
      <span>{{ item.label }} :</span>
    </div>
    <div class="exp-coupon-input-input">
      <template v-if="item.inputType === 'input'">
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
      <template v-else-if="item.inputType === 'text'">
        <!-- <span>{{ makeComma((item.viewValue as number) || 0) }}</span> -->
        <span>{{ makeComma(item.value as number) }}</span>
      </template>
    </div>
    <div v-if="item.viewValue" class="exp-coupon-input-action">
      <VBtn
        @click="emits('apply')"
        :color="item.disabled ? 'grey' : 'primary'"
        :disabled="item.disabled as boolean"
        >적용</VBtn
      >
    </div>
  </li>
</template>

<style scoped lang="scss">
li.exp-coupon-input {
}
</style>
