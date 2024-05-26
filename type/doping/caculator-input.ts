import type { WritableComputedRef } from 'vue';

export type CaculatorInput = {
  label: string;
  value: WritableComputedRef<number> | number;
  type: 'number' | 'text';
  inputType: 'select' | 'input';
  options: { name: string; value: number }[];
  optionLabel: string;
  optionValue: string;
  viewValue?: ComputedRef<number> | number;
  max?: number;
  step?: number;
  prefix?: number;
};
