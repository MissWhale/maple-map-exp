import mesoRates from '@/assets/json/meso.json';
import { DEFAULT_MESO } from '~/composables/doping';
import { usePresetStore } from '~/store/setting/preset';
import type { CalculatorInput } from '~/type/doping/caculator-input';
export const MesoRates = mesoRates;
export const defaultMeso = (monsterLevel: number) => {
  return {
    min: monsterLevel * 0.6,
    max: monsterLevel * 0.9,
  };
};

export const mesoCalculate = (monsterLevel: number, characterLevel: number) => {
  const levelDifference = characterLevel - monsterLevel;
  const rate = findMesoRate(levelDifference);
  return {
    min: Math.round(monsterLevel * 0.6 * (rate / 100)),
    max: Math.round(monsterLevel * 0.9 * (rate / 100)),
  };
};

const findMesoRate = (levelDifference: number) => {
  const findRate = MesoRates.find((rate) => rate.level === levelDifference);
  if (levelDifference <= -34 || levelDifference >= 30 || !findRate) return 100;
  return 100 - findRate.exp;
};

export const useMesoCalculator = () => {
  const presetStore = usePresetStore();
  const mesoInputList = ref<CalculatorInput[]>([
    {
      label: '재물획득의 비약',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].meso
            .accElixir;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].meso.accElixir = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: accElixirList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '아이템 잠재',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].meso
            .itemPotential;
        },
        set(value) {
          if (Number(value) > 100) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].meso.itemPotential = 100;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].meso.itemPotential = Number(value);
          }
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 100,
    },
    {
      label: '유니온의 부',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].meso
            .unionMesoCoupon;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].meso.unionMesoCoupon = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: unionMesoCouponList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '어빌리티',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].meso
            .ability;
        },
        set(value) {
          if (Number(value) > 20) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].meso.ability = 20;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].meso.ability = Number(value);
          }
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 20,
    },
    {
      label: '팬텀 유니온',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].meso
            .phantom;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].meso.phantom =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: phantomUnionList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '유니온 아티팩트',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].meso
            .unionArtifact;
        },
        set(value) {
          if (Number(value) > 12) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].meso.unionArtifact = 12;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].meso.unionArtifact = Number(value);
          }
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 12,
    },
    {
      label: '그리드',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].meso
            .greed;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].meso.greed =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: greedList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '기타',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].meso
            .etc;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].meso.etc =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
    },
  ]);
  const totalMeso = computed(() => {
    const otherSum = mesoInputList.value.reduce(
      (acc, cur, index) => (index > 0 ? acc + (cur.viewValue || cur.value) : 0),
      0,
    );
    return presetStore.presetList[presetStore.currentPresetIndex].meso.accElixir
      ? Math.round((otherSum + 100) * 1.2) - 100
      : otherSum;
  });
  const resetMeso = () => {
    Object.keys(
      presetStore.presetList[presetStore.currentPresetIndex].meso,
    ).forEach((key) => {
      presetStore.presetList[presetStore.currentPresetIndex].meso[
        key as keyof typeof DEFAULT_MESO
      ] = DEFAULT_MESO[key as keyof typeof DEFAULT_MESO];
    });
  };
  return {
    mesoInputList,
    totalMeso,
    resetMeso,
  };
};

export const unionMesoCouponList = [
  {
    name: '없음',
    key: 0,
    value: 0,
  },
  {
    name: '사용',
    key: 1,
    value: 50,
  },
];

export const phantomUnionList = [
  {
    name: '없음',
    key: 0,
    value: 0,
  },
  {
    name: 'B등급 - Lv.130',
    key: 1,
    value: 1,
  },
  {
    name: 'A등급 - Lv.160',
    key: 2,
    value: 2,
  },
  {
    name: 'S등급 - Lv.180',
    key: 0,
    value: 3,
  },
  {
    name: 'SS등급 - Lv.200',
    key: 3,
    value: 4,
  },
  {
    name: 'SSS등급 - Lv.250',
    key: 4,
    value: 5,
  },
];

export const greedList = [
  {
    name: '없음',
    key: 0,
    value: 0,
  },
  {
    name: 'Lv.5',
    key: 1,
    value: 20,
  },
];
