<script setup lang="ts">
import type { MobInfo } from '~/type/hunt/hunt.mob.type';

defineProps<{
  mobInfo: MobInfo;
}>();
</script>

<template>
  <li class="hunt-detail-mob-list">
    <div class="hunt-detail-info">
      <span>LV. {{ mobInfo.level }}</span>
      <span>{{ mobInfo.name }}</span>
    </div>
    <ul>
      <HuntDetailMob
        v-for="info in mobInfo.valueList"
        :key="info.name"
        :info="info"
      />
    </ul>
  </li>
</template>

<style scoped lang="scss">
li.hunt-detail-mob-list {
  display: grid;
  grid-template-columns: 180px 1fr;
  row-gap: 12px;
  div.hunt-detail-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
