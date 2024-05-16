<script setup lang="ts">
import { UseVirtualList } from '@vueuse/components';
import { useMapSettingStore } from '~/store';
import { useVirtualList } from '@vueuse/core';
const OPTIONS = {
  overscan: 5,
  itemHeight: 54,
};
const emits = defineEmits<{
  click: [number];
}>();
const { mapTableHeader } = useMapSettingStore();

const areaList = ref<Array<number>>([]);
const headers = computed(() => mapTableHeader.filter((header) => header.value));

const selectMapList = computed(() => {
  return areaList.value.length
    ? mapName.value && mapName.value !== ''
      ? mapList
          .filter((map) => {
            return areaList.value.includes(map.areaKey);
          })
          .filter((map) => map.name.includes(mapName.value))
      : mapList.filter((map) => {
          return areaList.value.includes(map.areaKey);
        })
    : mapName.value && mapName.value !== ''
      ? mapList.filter((map) => map.name.includes(mapName.value))
      : mapList;
});

const mapName = ref<string>('');
const handleInput = (e: string) => {
  mapName.value = e;
};
const { list, containerProps, wrapperProps } = useVirtualList(selectMapList, {
  // Keep `itemHeight` in sync with the item's row.
  itemHeight: 54,
});
</script>

<template>
  <section class="select-map-list-section">
    <div class="select-map-list-header">
      <div class="search-map-name">
        <vs-input
          :model-value="mapName"
          label="맵 이름"
          label-float
          block
          @input="handleInput"
        />
      </div>
      <div class="select-area">
        <vs-select
          v-model="areaList"
          :max-collapse-chips="2"
          label="지역"
          block
          multiple
          filter
          collapse-chips
          flip
        >
          <vs-option
            v-for="area in DefaultAreaList"
            :key="area.areaKey"
            :label="area.name"
            :value="area.areaKey"
          >
            {{ area.name }}
          </vs-option>
        </vs-select>
      </div>
      <SelectMapSelectButton />
    </div>
    <table
      v-bind="containerProps"
      class="select-map-table"
      style="height: 600px"
    >
      <thead>
        <tr class="header">
          <th
            v-for="header in headers"
            :key="header.name"
            :class="header.class"
          >
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody v-if="list.length" v-bind="wrapperProps">
        <SelectMap
          v-for="item in list"
          :key="item.index"
          style="height: 54px"
          :map="item.data"
          @click="emits('click', item.data.key)"
        />
      </tbody>
      <div v-else class="no-list">검색결과가 없습니다</div>
    </table>
  </section>
</template>

<style scoped lang="scss">
@import './SelectMap.scss';
.select-map-list-section {
  padding: 10px;
  .select-map-list-header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 10px;
    padding-bottom: 8px;
    flex-wrap: wrap;
  }
  table.select-map-table {
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    border-spacing: 0;
    width: 100%;
    thead {
      display: table-header-group;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      th {
        padding: 8px;
        height: 50px;
        background-color: rgba(var(--ob-background), 1);
      }
    }
    div.no-list {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 600px;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
