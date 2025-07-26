<script setup lang="ts">
import { useHuntStore } from '~/store';
import type { MobInfo } from '~/type/hunt/hunt.mob.type';

const huntStore = useHuntStore();

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

const {
  boostCount,
  boostMobCount,
  boostMobExp,
  boostMobOneExp,
  boostMobOneExpPer,
  boostMobTotalExp,
  boostMobTotalExpPer,
} = useBoost(props.id, props.mobInfo);

const expInfoList = computed(() => {
  return [
    { name: '1마리 경험치', value: boostMobExp.value },
    {
      name: '1회 경험치',
      value: `${boostMobOneExp.value} (${boostMobOneExpPer.value}%)`,
    },
    {
      name: '총 경험치',
      value: `${boostMobTotalExp.value} (${boostMobTotalExpPer.value}%)`,
    },
  ];
});
</script>

<template>
  <div class="hunt-detail-boost-container">
    <p>VIP 부스터</p>
    <ul>
      <li class="hunt-detail-boost-input">
        <v-text-field v-model="boostCount" hideDetails type="number" />
        <span>회</span>
        <v-text-field v-model="boostMobCount" hideDetails type="number" />
        <span>마리</span>
      </li>
      <li v-for="item in expInfoList" class="exp-info">
        <span>{{ item.name }}</span>
        <span>{{ makeComma(item.value) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
div.hunt-detail-boost-container {
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
  ul {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    li.hunt-detail-boost-input {
      display: grid;
      grid-template-columns: 1fr 30px 1fr 30px;
      align-items: center;
      column-gap: 8px;
    }
    li.exp-info {
      display: grid;
      grid-template-columns: 100px 1fr;
      align-items: center;
      column-gap: 8px;
    }
  }
}
</style>
