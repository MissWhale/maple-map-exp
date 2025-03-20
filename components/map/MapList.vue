<script setup lang="ts">
import { useMapSettingStore } from '~/store';
import type { MapInfo } from '~/type/map';

defineProps({
  map: {
    type: Object as PropType<MapInfo>,
    required: true,
  },
});
const { mapTableHeader } = useMapSettingStore();
const headers = computed(() =>
  mapTableHeader.filter((header) => header.value).map((header) => header.name),
);
const isAreaView = computed(() => headers.value.includes('지역'));
const isMapView = computed(() => headers.value.includes('맵'));
const isForceView = computed(() => headers.value.includes('포스'));
const isRegenView = computed(() => headers.value.includes('젠수'));
const isMaxHourView = computed(() => headers.value.includes('최대 마리수'));
const isLevelView = computed(() => headers.value.includes('평균 레벨'));
const isMonsterView = computed(() => headers.value.includes('몬스터'));
</script>

<template>
  <tr class="map-list">
    <td v-if="isAreaView" class="area">
      <div>
        <AreaImage :areaKey="map.area.areaKey" />
        <span>{{ map.area.name }}</span>
      </div>
    </td>
    <td v-if="isMapView" class="map">{{ map.name }}</td>
    <td v-if="isForceView" class="force">
      <div>
        <ForceImage :continent="map.area.continent" />
        <span>{{ map.force }}</span>
      </div>
    </td>
    <td v-if="isRegenView" class="regen">{{ map.regen }}</td>
    <td v-if="isMaxHourView" class="max-hour">{{ makeComma(map.maxHour) }}</td>
    <td v-if="isLevelView" class="level">{{ map.avgMobLevel }}</td>
    <td v-if="isMonsterView" class="monster">
      <ul>
        <li class="mob-list" v-for="mob in map.mob" :key="mob.mobKey">
          <span class="mob-level">LV. {{ mob.level }}</span>
          <span class="mob-name">{{ mob.name }}</span>
        </li>
      </ul>
    </td>
  </tr>
</template>

<style scoped lang="scss">
@import './Map.scss';
tr.map-list {
  width: 100%;
  td.area,
  td.force {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
  }
  td.monster {
    ul {
      display: flex;
      justify-content: center;
      flex-direction: column;
      row-gap: 8px;
      width: 100%;
      li.mob-list {
        span.mob-level {
          min-width: 60px;
          margin-right: 4px;
        }
      }
    }
  }
  background-color: rgba(var(--ob-background), 0.3);
  &:hover {
    background-color: rgba(var(--ob-background), 1);
    cursor: pointer;
  }
}
</style>
