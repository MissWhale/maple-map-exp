import { DEFAULT_EXP } from '~/composables/doping';
import { usePresetStore } from '~/store/setting/preset';
import type { CalculatorInput } from '~/type/doping/caculator-input';

export const useExpCalculator = () => {
  const presetStore = usePresetStore();
  const expInputList = ref<CalculatorInput[]>([
    {
      label: '메르세데스 링크',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .merecedes;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.merecedes =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: MecedesLinkList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '제로 유니온',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .zero;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.zero =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: zeroUnionList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '유니온 경험치',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .unionExpOcc;
        },
        set(value) {
          if (Number(value) > 10) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].exp.unionExpOcc = 10;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].exp.unionExpOcc = Number(Number(value).toFixed(2));
          }
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 10,
      step: 0.25,
    },
    {
      label: '유니온 아티팩트',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .unionArtifact;
        },
        set(value) {
          if (Number(value) > 12) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].exp.unionArtifact = 12;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].exp.unionArtifact = Number(Number(value).toFixed(0));
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
      label: '마약 버프',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .drug;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.drug =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: drugList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '하이퍼스탯',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .hyper;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.hyper =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 15,
    },
    {
      label: '경험치 쿠폰',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .expCoupon;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.expCoupon =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: expCouponList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '추가 경험치 쿠폰',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .expPlusCoupon;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].exp.expPlusCoupon = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: expPlusCouponList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: 'VIP 버프',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .vipBuff;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.vipBuff =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: vipBuffList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '익스트림 골드',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .exteramGold;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].exp.exteramGold = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: exteramGoldList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '경험치 축적의 비약',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .expAccElixir;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].exp.expAccElixir = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: expAccElixirList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '솔 야누스',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .solJanus;
        },
        set(value) {
          if (Number(value) > 100) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].exp.solJanus = 100;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].exp.solJanus = Number(Number(value).toFixed(0));
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
      label: '홀리심볼',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .holySymbol;
        },
        set(value) {
          if (Number(value) > 70) {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].exp.holySymbol = 70;
          } else {
            presetStore.presetList[
              presetStore.currentPresetIndex
            ].exp.holySymbol = Number(Number(value).toFixed(0));
          }
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      max: 70,
    },
    {
      label: '로디드 다이스',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .roadedDice;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].exp.roadedDice = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: roadedDiceList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '쇼다운',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .showdown;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.showdown =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: showdownList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '정령의 펜던트',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .pendant;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.pendant =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: pendantList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '혈맹의 반지',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .clanRing;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.clanRing =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: clanRingList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '경험치 부스트 링',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .expBoostRing;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].exp.expBoostRing = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: expBoostRingList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '칭호',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .characterTitle;
        },
        set(value) {
          presetStore.presetList[
            presetStore.currentPresetIndex
          ].exp.characterTitle = Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: characterTitleList,
      optionLabel: 'name',
      optionValue: 'key',
      viewValue: computed(
        () =>
          characterTitleList.find(
            (item) =>
              item.key ===
              presetStore.presetList[presetStore.currentPresetIndex].exp
                .characterTitle,
          )?.value || 0,
      ),
    },
    {
      label: '필드 버닝',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .burning;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.burning =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: mapBurningList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '룬',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .rune;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.rune =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: runeList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: 'PC방',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .pcRoomExp;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.pcRoomExp =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: pcRoomExpList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '서버',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp
            .server;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.server =
            Number(value);
        },
      }),
      type: 'number',
      inputType: 'select',
      options: severList,
      optionLabel: 'name',
      optionValue: 'value',
    },
    {
      label: '기타',
      value: computed({
        get() {
          return presetStore.presetList[presetStore.currentPresetIndex].exp.etc;
        },
        set(value) {
          presetStore.presetList[presetStore.currentPresetIndex].exp.etc =
            Number(Number(value).toFixed(1));
        },
      }),
      type: 'number',
      inputType: 'input',
      options: [],
      optionLabel: '',
      optionValue: '',
      step: 0.1,
      prefix: 1,
    },
  ]);
  const totalExp = computed(() =>
    expInputList.value.reduce(
      (acc, cur) => acc + (cur.viewValue || cur.value),
      0,
    ),
  );
  const resetExp = () => {
    Object.keys(
      presetStore.presetList[presetStore.currentPresetIndex].exp,
    ).forEach((key) => {
      presetStore.presetList[presetStore.currentPresetIndex].exp[
        key as keyof typeof DEFAULT_EXP
      ] = DEFAULT_EXP[key as keyof typeof DEFAULT_EXP];
    });
  };
  return { expInputList, totalExp, resetExp };
};

export const MecedesLinkList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '1레벨 - Lv.70',
    value: 10,
  },
  {
    name: '2레벨 - Lv.120',
    value: 15,
  },
];

export const zeroUnionList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: 'B등급 - Lv.130',
    value: 4,
  },
  {
    name: 'A등급 - Lv.160',
    value: 6,
  },
  {
    name: 'S등급 - Lv.180',
    value: 8,
  },
  {
    name: 'SS등급 - Lv.200',
    value: 10,
  },
  {
    name: 'SSS등급 - Lv.250',
    value: 12,
  },
];

export const drugList = range(0, 7).map((i) => {
  return {
    name: `${i}레벨`,
    value: 2.5 * i,
  };
});

export const expCouponList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '2배 쿠폰',
    value: 100,
  },
  {
    name: '3배 쿠폰',
    value: 200,
  },
];

export const expPlusCouponList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '사용',
    value: 50,
  },
];

export const vipBuffList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '사용',
    value: 15,
  },
];

export const exteramGoldList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '사용',
    value: 10,
  },
];

export const expAccElixirList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '일반',
    value: 10,
  },
  {
    name: '고농축',
    value: 20,
  },
];

export const roadedDiceList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '사용',
    value: 30,
  },
];

export const showdownList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '하이퍼 X',
    value: 5,
  },
  {
    name: '하이퍼 O',
    value: 10,
  },
];

export const pendantList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '1단계',
    value: 10,
  },
  {
    name: '2단계',
    value: 20,
  },
  {
    name: '3단계',
    value: 30,
  },
];

export const clanRingList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '사용',
    value: 10,
  },
];

export const expBoostRingList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '사용',
    value: 15,
  },
];

export const characterTitleList = [
  {
    name: '없음',
    key: 0,
    value: 0,
  },
  {
    name: '쑥쑥 새싹',
    key: 1,
    value: 10,
  },
  {
    name: 'Eternal Flame',
    key: 2,
    value: 10,
  },
  {
    name: 'Infinite Flame',
    key: 3,
    value: 20,
  },
  {
    name: 'Premium 칭호',
    key: 4,
    value: 20,
  },
  {
    name: '엘 클리어',
    key: 5,
    value: 30,
  },
];
export const mapBurningList = range(0, 11).map((i) => {
  return {
    name: `${i}단계`,
    value: 10 * i,
  };
});
export const runeList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '에반 링크 0레벨',
    value: 20,
  },
  {
    name: '에반 링크 1레벨',
    value: 26,
  },
  {
    name: '에반 링크 2레벨',
    value: 30,
  },
  {
    name: '헤이스트 + 에반 링크 0레벨',
    value: 30,
  },
  {
    name: '헤이스트 + 에반 링크 1레벨',
    value: 39,
  },
  {
    name: '헤이스트 + 에반 링크 2레벨',
    value: 45,
  },
];

export const pcRoomExpList = [
  {
    name: '없음',
    value: 0,
  },
  {
    name: '사용',
    value: 30,
  },
];

export const severList = [
  {
    name: '일반 서버',
    value: 0,
  },
  {
    name: '버닝 서버',
    value: 50,
  },
];
