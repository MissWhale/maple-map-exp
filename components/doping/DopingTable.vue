<script setup lang="ts">
import { usePresetStore } from '~/store/setting/preset';

const props = defineProps({
  dopingType: {
    type: Number,
    required: true,
  },
});
const { expInputList, resetExp } = useExpCalculator();
const { itemDropInputList, resetItemDrop } = useItemDropCalculator();
const { mesoInputList, resetMeso } = useMesoCalculator();
const resetButtonName = computed(() => {
  if (props.dopingType === 0) {
    return '경험치 리셋';
  } else if (props.dopingType === 1) {
    return '아이템 드롭률 리셋';
  } else {
    return '메소 획득량 리셋';
  }
});
const inputList = computed(() =>
  props.dopingType === 0
    ? expInputList.value
    : props.dopingType === 1
      ? itemDropInputList.value
      : mesoInputList.value,
);
function resetButton() {
  if (props.dopingType === 0) {
    resetExp();
  } else if (props.dopingType === 1) {
    resetItemDrop();
  } else {
    resetMeso();
  }
}
const HEADERS = [
  { label: '도핑', class: 'doping-input-label' },
  { label: '선택', class: 'doping-input' },
  { label: '증가 확률', class: 'doping-input-value' },
];
</script>

<template>
  <div class="doping-table">
    <div class="doping-table-header">
      <VBtn
        :text="resetButtonName"
        density="comfortable"
        color="warning"
        @click="resetButton"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th
            v-for="header in HEADERS"
            :key="header.label"
            class="text-medium-emphasis"
            :class="header.class"
          >
            <span class="doping-input-label">{{ header.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <DopingInput v-for="item in inputList" :key="item.label" :item="item" />
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@import './Doping.scss';
div.doping-table-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
}
div.doping-table {
  table {
    min-width: 340px;
    width: 100%;
    th {
      height: 50px;
      font-weight: 500;
    }
  }
}
</style>
