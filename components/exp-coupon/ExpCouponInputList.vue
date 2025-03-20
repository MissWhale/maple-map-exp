<script setup lang="ts">
import type { CalculatorInput } from '~/type/doping/caculator-input';
const emits = defineEmits(['apply']);
defineProps<{
  list: CalculatorInput[];
}>();
</script>

<template>
  <div class="exp-coupon-input-list">
    <ul>
      <ExpCouponInput
        v-for="item in list"
        :key="item.label"
        :item="item"
        @apply="emits('apply')"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
div.exp-coupon-input-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
