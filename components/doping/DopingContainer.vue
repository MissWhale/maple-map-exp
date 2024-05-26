<script setup lang="ts">
const dopingSelection = ref(0);
const dopingList = reactive([
  {
    name: '경험치',
    value: 0,
  },
  {
    name: '아이템 드롭률',
    value: 1,
  },
  {
    name: '메소 획득량',
    value: 2,
  },
]);
const { totalExp } = useExpCalculator();
const { totalItemDrop, mesoDropPercent } = useItemDropCalculator();
const { totalMeso } = useMesoCalculator();
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
</script>

<template>
  <section class="doping-section">
    <PresetContainer />
    <div class="doping-info">
      <dl>
        <template v-for="info in dopingInfoList">
          <dt>{{ info.name }} :</dt>
          <dd>{{ info.value }}%</dd>
        </template>
      </dl>
    </div>
    <div class="doping-selection">
      <VBtnToggle v-model="dopingSelection" mandatory>
        <VBtn
          v-for="doping in dopingList"
          :key="doping.value"
          :value="doping.value"
          color="primary"
          height="100%"
          :slim="false"
          :text="doping.name"
          @click="dopingSelection = doping.value"
        >
        </VBtn>
      </VBtnToggle>
    </div>
    <DopingTable :dopingType="dopingSelection" />
  </section>
</template>

<style scoped lang="scss">
section.doping-section {
  div.doping-info {
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
  .doping-selection {
    display: flex;
    justify-content: center;
    & > div {
      align-items: flex-end;
    }
  }
}
</style>
