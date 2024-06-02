import type { CalculatorInput } from '../doping/caculator-input';

export interface DailyQuestInput extends CalculatorInput {
  exp: number | ComputedRef<number>;
  expPer: number | ComputedRef<number>;
  disabled: boolean | ComputedRef<boolean>;
  continent: number;
}
