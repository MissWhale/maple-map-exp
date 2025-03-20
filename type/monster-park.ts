import type { CalculatorInput } from './doping/caculator-input';

export interface MonsterParkInput extends CalculatorInput {
  exp: number | ComputedRef<number>;
  expPer: number | ComputedRef<number>;
  disabled: boolean | ComputedRef<boolean>;
}
