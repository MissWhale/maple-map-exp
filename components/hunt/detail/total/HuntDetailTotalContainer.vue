<script setup lang="ts">
import { useLevelStore } from '~/store';
import type { MobInfo } from '~/type/hunt/hunt.mob.type';
const levelStore = useLevelStore();
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  mobInfo: {
    type: Array as PropType<MobInfo[]>,
    required: true,
  },
});
const { totalHuntCount } = useHuntTime(props.id);
const { eventCountExp } = useEvent(props.id, props.mobInfo);
const { boostMobTotalExp } = useBoost(props.id, props.mobInfo);
const mobCount = computed(() => props.mobInfo.length);
const totalInfo = computed(() => {
  const countOfMob = Math.floor(totalHuntCount.value / mobCount.value);
  const mobTotalInfo = props.mobInfo.map((info) => {
    return {
      name: info.name,
      count: countOfMob,
      exp: info.dopingExp * countOfMob,
      meso: info.dopingMeso * countOfMob,
    };
  });
  const totalExp =
    mobTotalInfo.reduce((acc, cur) => acc + cur.exp, 0) +
    eventCountExp.value +
    boostMobTotalExp.value;
  const totalMeso = mobTotalInfo.reduce((acc, cur) => acc + cur.meso, 0);
  const totalExpPer = ((totalExp / getMaxExp(levelStore.level)) * 100).toFixed(
    3,
  );
  return {
    mobTotalInfo,
    totalExp,
    totalExpPer,
    totalMeso,
  };
});
</script>

<template>
  <div class="hunt-detail-total-container">
    <p>총 사냥</p>
    <ul>
      <HuntDetailTotalInfo
        v-for="info in totalInfo.mobTotalInfo"
        :key="info.name"
        :totalInfo="info"
      />
    </ul>
    <ul class="total-info">
      <li>
        <span>총 경험치</span>
        <span>{{ makeComma(totalInfo.totalExp) }}</span>
      </li>
      <li>
        <span>총 메소</span>
        <span>{{ makeComma(totalInfo.totalMeso) }}</span>
      </li>
      <li>
        <span>총 경험치 배율</span>
        <span>{{ totalInfo.totalExpPer }}%</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.hunt-detail-total-container {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  padding: 16px;
  p {
    font-size: 20px;
    font-weight: bold;
  }
  ul.total-info {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    li {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 8px;
      &:last-child {
        font-weight: bold;
      }
    }
  }
}
</style>
