<script setup lang="ts">
import type { Hunt } from '~/store/hunt';

const props = defineProps({
  info: {
    type: Object as PropType<Hunt>,
    required: true,
  },
});
</script>

<template>
  <tr class="hunt-list">
    <td class="map">{{ info.mapId }}</td>
    <td class="exp">{{ info.huntTime }}</td>
    <td class="percent">
      <span>test</span>
      <VBtn color="success" text="정보" />
      <VBtn color="error" text="삭제" />
    </td>
  </tr>
</template>

<style scoped lang="scss">
tr.hunt-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
