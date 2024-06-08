import type { WritableComputedRef } from 'vue';
export interface Option {
  name: string;
  value: number;
  [x: string]: string | number;
}
export interface CalculatorInput {
  label: string;
  value:
    | WritableComputedRef<number | boolean | null>
    | ComputedRef<number>
    | number
    | boolean
    | null;
  type: 'number' | 'text' | 'boolean';
  inputType: 'select' | 'input' | 'switch' | 'checkbox' | 'text';
  options?: Option[] | ComputedRef<Option[]>;
  optionLabel?: string;
  optionValue?: string;
  viewValue?: ComputedRef<number> | number;
  max?: number;
  min?: number;
  step?: number;
  prefix?: number;
  suffix?: ComputedRef<string> | string;
  disabled?: ComputedRef<boolean> | boolean;
}
