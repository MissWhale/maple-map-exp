import { DEFAULT_ITEM_DROP } from '~/store';
import { usePresetStore } from '~/store/setting/preset';
import type { CaculatorInput } from '~/type/doping/caculator-input';

export const useItemDropCalculator = () => {
  const presetStore = usePresetStore();
  const itemDropInputList = ref<CaculatorInput[]>([
    {
      label: '재물획득의 비약',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .accElixir;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].itemDrop.accElixir = Number(value);
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
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .itemPotential;
        },
        set(value) {
          if (Number(value) > 200) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.itemPotential = 200;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.itemPotential = Number(value);
          }
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 200,
    },
    {
      label: '유니온의 행운',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .unionItemCoupon;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].itemDrop.unionItemCoupon = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: unionItemCouponList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '어빌리티',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .ability;
        },
        set(value) {
          if (Number(value) > 20) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.ability = 20;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.ability = Number(value);
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
      label: '유니온 아티팩트',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .unionArtifact;
        },
        set(value) {
          if (Number(value) > 12) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.unionArtifact = 12;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.unionArtifact = Number(value);
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
      label: 'PC방',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .pcRoomItem;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].itemDrop.pcRoomItem = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: pcRoomItemList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '홀리심볼',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .holySymbol;
        },
        set(value) {
          if (Number(value) > 30) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.holySymbol = 30;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.holySymbol = Number(value);
          }
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 30,
    },
    {
      label: '쇼다운 챌린지',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .showdown;
        },
        set(value) {
          if (Number(value) > 10) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.showdown = 10;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].itemDrop.showdown = Number(value);
          }
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 10,
    },
    {
      label: '데빌크라이',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .devilCry;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].itemDrop.devilCry = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: devilCryList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '기타',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].itemDrop
            .etc;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].itemDrop.etc =
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
  const totalItemDrop = computed(() =>
    itemDropInputList.value.reduce(
      (acc, cur) => acc + (cur.viewValue || cur.value),
      0,
    ),
  );
  const resetItemDrop = () => {
    Object.keys(
      presetStore.presetList[presetStore.currentPresetIndex].itemDrop,
    ).forEach((key) => {
      presetStore.presetList[presetStore.currentPresetIndex].itemDrop[
        key as keyof typeof DEFAULT_ITEM_DROP
      ] = DEFAULT_ITEM_DROP[key as keyof typeof DEFAULT_ITEM_DROP];
    });
  };
  const mesoDropPercent = computed(() => {
    const defaultPercent = 60;
    const itemDropPercent = (defaultPercent * totalItemDrop.value) / 100;
    const totalPercent = 60 + itemDropPercent;
    return totalPercent > 100 ? 100 : Math.round(totalPercent);
  });
  return {
    itemDropInputList,
    totalItemDrop,
    resetItemDrop,
    mesoDropPercent,
  };
};

export const accElixirList = [
  {
    name: '없음',
    key: 0,
    value: 0,
  },
  {
    name: '사용',
    key: 1,
    value: 20,
  },
];

export const unionItemCouponList = [
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

export const pcRoomItemList = [
  {
    name: '없음',
    key: 0,
    value: 0,
  },
  {
    name: '사용',
    key: 1,
    value: 10,
  },
];

export const devilCryList = [
  {
    name: '없음',
    key: 0,
    value: 0,
  },
  {
    name: '사용',
    key: 1,
    value: 20,
  },
];
