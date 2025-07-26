<script setup lang="ts">
import { useHuntStore } from '~/store/hunt';
import { useLevelStore } from '~/store/level';
import type { FindMapInfo } from '~/type/hunt/hunt.map.type';
import type { MobInfo } from '~/type/hunt/hunt.mob.type';
const levelStore = useLevelStore();
const huntStore = useHuntStore();
const { totalExp } = useExpCalculator();
const { totalItemDrop, mesoDropPercent } = useItemDropCalculator();
const { totalMeso } = useMesoCalculator();
const emits = defineEmits<{
  (event: 'confirm'): void;
  (event: 'cancel', id: number): void;
}>();
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  mapId: {
    type: Number,
    required: false,
  },
  isEdit: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const findMapInfo = computed<FindMapInfo>(() => {
  const info = props.isEdit
    ? mapList.find((map) => map.key === huntStore.huntList[props.id].mapId)
    : mapList.find((map) => map.key === props.mapId);
  if (info) return info as FindMapInfo;
  else
    return {
      avgMobLevel: 0,
      area: {
        name: '',
        areaKey: 0,
        continent: 0,
      },
      mob: [],
      key: 0,
      areaKey: 0,
      name: '',
      force: 0,
      regen: 0,
      maxHour: 0,
    } as FindMapInfo;
});
const mobInfo = computed<MobInfo[]>(() => {
  return findMapInfo.value.mob.map((info) => {
    const defaultMesoInfo = defaultMeso(info.level);
    const avgMobMeso = Math.round(
      defaultMesoInfo.avg * (mesoDropPercent.value / 100),
    );
    const expRates = getExpRates(levelStore.level, info.level);
    const expRate = expRates.exp === 0 ? expRates.rate * 100 : expRates.exp;
    const levelExp =
      expRates.exp === 0 ? Math.round(info.exp * expRates.rate) : info.exp;
    const nonLevelDopingExp = Math.round(info.exp * (1 + totalExp.value / 100));
    const dopingExp =
      expRates.exp === 0
        ? Math.round(levelExp * (1 + totalExp.value / 100))
        : info.exp;
    const mesoRates = mesoCalculate(info.level, levelStore.level);
    const mesoLevelAvg = defaultMesoInfo.avg * (mesoRates.rate / 100);
    const mesoLevelDrop = Math.round(
      mesoLevelAvg * (mesoDropPercent.value / 100),
    );
    const mesoLevelDoping = Math.round(
      mesoLevelDrop * (1 + totalMeso.value / 100),
    );
    return {
      level: info.level,
      name: info.name,
      dopingExp: dopingExp,
      dopingMeso: mesoLevelDoping,
      nonLevelDopingExp: nonLevelDopingExp,
      valueList: [
        {
          name: '레벨 차이',
          value: levelStore.level - info.level,
        },
        {
          name: '기본경험치',
          value: makeComma(info.exp),
        },
        {
          name: '경험치 배율',
          value: makeComma(expRate) + '%',
        },
        {
          name: '레벨 기준 경험치',
          value: makeComma(levelExp),
        },
        {
          name: '도핑 경험치',
          value: makeComma(dopingExp),
        },
        {
          name: '기본메소',
          value: `${makeComma(defaultMesoInfo.min)}~${makeComma(defaultMesoInfo.max)}`,
        },
        {
          name: '평균메소 기대값',
          value: makeComma(avgMobMeso),
        },
        {
          name: '레벨 기준 메소 배율',
          value: mesoRates.rate + '%',
        },
        {
          name: '레벨 기준 메소 평균',
          value: makeComma(Math.round(mesoLevelAvg)),
        },
        {
          name: '레벨 기준 메소 기대값',
          value: makeComma(mesoLevelDrop),
        },
        {
          name: '도핑 메소',
          value: makeComma(mesoLevelDoping),
        },
      ],
    };
  });
});
const dopingInfoList = computed(() => [
  {
    name: '추가 경험치 획득',
    value: totalExp.value,
  },
  {
    name: '아이템 드롭률',
    value: totalItemDrop.value,
  },
  {
    name: '메소 획득량',
    value: totalMeso.value,
  },
  {
    name: '메소 드롭듈',
    value: mesoDropPercent.value,
  },
]);
const confirm = () => {
  emits('confirm');
};
const cancel = () => {
  emits('cancel', props.id);
};
</script>

<template>
  <div class="hunt-detail-count">
    <div class="doping-info">
      <dl>
        <template v-for="info in dopingInfoList">
          <dt>{{ info.name }} :</dt>
          <dd>{{ info.value }}%</dd>
        </template>
      </dl>
      <div class="action-list">
        <v-btn color="primary" size="large" @click="confirm">입력완료</v-btn>
        <v-btn color="error" size="large" @click="cancel">입력취소</v-btn>
      </div>
    </div>
    <div class="detail-container">
      <div class="first-column">
        <HuntDetailMapContainer :findMapInfo="findMapInfo" />
        <HuntDetailTimeContainer :id="props.id" />
        <HuntDetailBoosterContainer :id="props.id" :mobInfo="mobInfo" />
      </div>
      <div class="second-column">
        <HuntDetailTotalContainer :id="props.id" :mobInfo="mobInfo" />
        <HuntDetailMobContainer :mobInfo="mobInfo" />
        <HuntDetailEventContainer :id="props.id" :mobInfo="mobInfo" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.hunt-detail-count {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  div.doping-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    div.action-list {
      display: flex;
      column-gap: 10px;
    }
    dl {
      display: grid;
      grid-template-columns: 130px 1fr;
      gap: 10px;
      dd {
        font-weight: 500;
        color: $primary;
      }
    }
  }
  div.detail-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    div.first-column,
    div.second-column {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
  }
}
</style>
