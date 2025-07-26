<script setup lang="ts">
import type { Hunt } from '~/store/hunt';
import { useHuntStore } from '~/store/hunt';

const huntStore = useHuntStore();
const emits = defineEmits<{
  (event: 'detailInfoClick', id: number): void;
}>();
const props = defineProps({
  info: {
    type: Object as PropType<Hunt>,
    required: true,
  },
});

function detailInfoClick() {
  emits('detailInfoClick', props.info.id!);
}

function deleteHunt() {
  if (props.info.id) {
    huntStore.deleteHunt(props.info.id);
  }
}
</script>

<template>
  <tr class="hunt-list">
    <td class="map">{{ info.mapId }}</td>
    <td class="exp">{{ info.huntTime }}</td>
    <td class="percent">
      <span>test</span>
      <VBtn color="success" text="정보" @click="detailInfoClick" />
      <VBtn color="error" text="삭제" @click="deleteHunt" />
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
