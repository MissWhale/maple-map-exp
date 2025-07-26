<script setup lang="ts">
import type { FindMapInfo } from '~/type/hunt/hunt.map.type';
import type { MobInfo } from '~/type/hunt/hunt.mob.type';

const props = defineProps<{
  mobInfo: MobInfo[];
}>();
</script>

<template>
  <div class="hunt-detail-mob-list">
    <p>몹 정보</p>
    <ul class="mob-info">
      <HuntDetailMobList
        v-for="info in mobInfo"
        :key="info.name"
        :mobInfo="info"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
div.hunt-detail-mob-list {
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
