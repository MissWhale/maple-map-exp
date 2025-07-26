<script setup lang="ts">
interface info {
  name: string;
  value: string | number | null;
}
defineProps({
  info: {
    type: Object as PropType<info>,
    required: true,
  },
});
</script>

<template>
  <li class="hunt-detail-map-info">
    <span>{{ info.name }}</span>
    <span>{{ info.value }}</span>
  </li>
</template>

<style scoped lang="scss">
li.hunt-detail-map-info {
  display: grid;
  grid-template-columns: 130px 1fr;
  row-gap: 12px;
}
</style>
