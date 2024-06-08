<script setup lang="ts">
import { useExpCouponStore } from '@/store/exp-coupon';
import { useAutoSetStore } from '~/store';
import type { CalculatorInput } from '~/type/doping/caculator-input';

const expCouponStore = useExpCouponStore();
const autoSet = useAutoSetStore();
function inputBlur() {
  if (String(expCouponStore.useExpCouponInput) === '') {
    expCouponStore.useExpCouponInput = 0;
  }
}
const inputList = ref<CalculatorInput[]>([
  {
    label: '현재 Exp 쿠폰',
    value: computed({
      get() {
        return expCouponStore.currentExpCoupon;
      },
      set(value) {
        if (value < 0 || value === undefined || value === null) {
          expCouponStore.currentExpCoupon = 0;
        } else {
          expCouponStore.currentExpCoupon = +value;
        }
        if (
          autoSet.expCouponAutoSelect &&
          value >= expCouponStore.currentLevelUpExpCoupon
        ) {
          expCouponStore.useExpCouponInputHandler =
            expCouponStore.currentLevelUpExpCoupon;
        }
      },
    }),
    type: 'number',
    inputType: 'input',
    suffix: '개',
    min: 0,
  },
  {
    label: '오늘 획득 Exp 쿠폰',
    value: computed({
      get() {
        return expCouponStore.todayGetExpCoupon;
      },
      set(value) {
        if (value < 0 || value === undefined || value === null) {
          expCouponStore.todayGetExpCoupon = 0;
        } else {
          expCouponStore.todayGetExpCoupon = +value;
        }
      },
    }),
    type: 'number',
    inputType: 'input',
    suffix: '개',
  },
  {
    label: '총 Exp 쿠폰',
    value: computed(
      () => expCouponStore.currentExpCoupon + expCouponStore.todayGetExpCoupon,
    ),
    type: 'number',
    inputType: 'text',
  },
  {
    label: '오늘 사용 Exp 쿠폰',
    value: computed(() => expCouponStore.todayUseExpCoupon),
    type: 'number',
    inputType: 'text',
  },
  {
    label: '레벨업 가능 Exp 쿠폰',
    value: computed(() => expCouponStore.currentLevelUpExpCoupon),
    type: 'number',
    inputType: 'text',
    viewValue: 1,
    disabled: computed(
      () =>
        expCouponStore.currentExpCoupon <
        expCouponStore.currentLevelUpExpCoupon,
    ),
  },
]);
const applyMaxExpCoupon = () => {
  expCouponStore.useExpCouponInputHandler =
    expCouponStore.currentLevelUpExpCoupon;
};

const useExpCoupon = () => {
  expCouponStore.useExpCoupon(expCouponStore.useExpCouponInputHandler);
};
</script>

<template>
  <section class="exp-coupon-container section">
    <div class="exp-coupon-container-header header">
      <p>Exp 쿠폰</p>
    </div>
    <ExpCouponInputList :list="inputList" @apply="applyMaxExpCoupon" />
    <div class="exp-coupon-use-input">
      <VTextField
        v-model:model-value="expCouponStore.useExpCouponInputHandler"
        type="number"
        :max="expCouponStore.currentLevelAvailableExpCoupon"
        min="0"
        suffix="개"
        color="primary"
        variant="outlined"
        hideDetails
        block
        @blur="inputBlur()"
      />
      <VBtn
        :disabled="!expCouponStore.isAvailableUseExpCoupon"
        @click="useExpCoupon"
        >사용</VBtn
      >
    </div>
    <div class="exp-coupon-auto-set">
      <VSwitch
        v-model="autoSet.expCouponAutoSelect"
        color="primary"
        label="자동입력"
        variant="outlined"
        hideDetails
        block
        inset
      />
      <VBtn color="error" @click="expCouponStore.resetTodayUseExpCoupon"
        >초기화</VBtn
      >
    </div>
  </section>
</template>

<style scoped lang="scss">
section.exp-coupon-container {
}
</style>
