import type { WritableComputedRef } from 'vue';

export type ElixirInfo = {
  key: number;
  elixir: string;
  exp: number;
  endLevel: number;
  count: number;
  useExp: number | ComputedRef<number>;
  useExpPer: number | ComputedRef<number>;
  valueCount: number | WritableComputedRef<number>;
};
