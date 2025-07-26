<script setup lang="ts">
import type { MobValue } from '~/type/hunt/hunt.mob.type';

defineProps<{
  info: MobValue;
}>();
</script>

<template>
  <li class="hunt-detail-mob">
    <span>{{ info.name }}</span>
    <span>{{ info.value }}</span>
  </li>
</template>

<style scoped lang="scss">
li.hunt-detail-mob {
  display: grid;
  grid-template-columns: 160px 1fr;
  row-gap: 12px;
  span {
    font-size: 14px;
  }
}
</style>
