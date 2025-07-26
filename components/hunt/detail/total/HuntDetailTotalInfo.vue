<script setup lang="ts">
interface TotalInfo {
  name: string;
  count: number;
  exp: number;
  meso: number;
}

const props = defineProps({
  totalInfo: {
    type: Object as PropType<TotalInfo>,
    required: true,
  },
});
const infoList = computed(() => [
  {
    name: '마리수',
    value: props.totalInfo.count,
  },
  {
    name: '경험치',
    value: props.totalInfo.exp,
  },
  {
    name: '메소',
    value: props.totalInfo.meso,
  },
]);
</script>

<template>
  <li class="hunt-detail-total-info">
    <p>{{ totalInfo.name }}</p>
    <ul>
      <li v-for="info in infoList" :key="info.name">
        <span>{{ info.name }}</span>
        <span>{{ makeComma(info.value) }}</span>
      </li>
    </ul>
  </li>
</template>

<style scoped lang="scss">
li.hunt-detail-total-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    font-weight: bold;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
    li {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 8px;
    }
  }
}
</style>
