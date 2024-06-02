import type { CalculatorInput } from '../doping/caculator-input';

export interface WeeklyQuestInput extends CalculatorInput {
  exp: number | ComputedRef<number>;
  expPer: number | ComputedRef<number>;
  disabled: boolean | ComputedRef<boolean>;
  skipLevel1: number;
  skipLevel2: number;
  min: number;
}
