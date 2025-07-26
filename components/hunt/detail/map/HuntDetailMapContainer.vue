<script setup lang="ts">
import type { FindMapInfo } from '~/type/hunt/hunt.map.type';

const props = defineProps<{
  findMapInfo: FindMapInfo;
}>();
const mapInfo = computed(() => [
  {
    name: '맵',
    value: props.findMapInfo.name,
  },
  {
    name: '지역',
    value: props.findMapInfo.area.name,
  },
  {
    name: '포스',
    value: props.findMapInfo.force,
  },
  {
    name: '몹젠',
    value: props.findMapInfo.regen,
  },
  {
    name: '1시간 마리수',
    value: makeComma(props.findMapInfo.maxHour),
  },
]);
</script>

<template>
  <div class="hunt-detail-map-list">
    <p>지도 정보</p>
    <ul class="map-info">
      <HuntDetailMapInfo
        v-for="info in mapInfo"
        :key="info.name"
        :info="info"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
div.hunt-detail-map-list {
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
    gap: 12px;
  }
}
</style>
