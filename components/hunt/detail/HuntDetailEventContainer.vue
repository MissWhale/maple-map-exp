<script setup lang="ts">
import { useEvent } from '~/composables/event';
import type { MobInfo } from '~/type/hunt/hunt.mob.type';
const props = defineProps<{
  id: number;
  mobInfo: MobInfo[];
}>();
const {
  eventCount,
  eventCountExp,
  eventCountExpPer,
  eventOneExp,
  eventOneExpPer,
  availableEventCount,
} = useEvent(props.id, props.mobInfo);
</script>

<template>
  <div class="hunt-detail-event-container">
    <p>이벤트 사냥 스킬</p>
    <ul>
      <li class="available-count">
        <span>사용 가능 횟수</span>
        <span>{{ availableEventCount }}</span>
      </li>
      <li class="event-one-exp">
        <span>1회 경험치</span>
        <span>{{ makeComma(eventOneExp) }} ({{ eventOneExpPer }} %)</span>
      </li>
      <li class="event-count-input">
        <v-text-field v-model="eventCount" hideDetails type="number" />
        <span>회</span>
      </li>
      <li class="event-total-exp">
        <span>총 경험치</span>
        <span>{{ makeComma(eventCountExp) }} ({{ eventCountExpPer }} %)</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
div.hunt-detail-event-container {
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
    row-gap: 8px;
    li.event-count-input {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }
    li:not(.event-count-input) {
      display: grid;
      grid-template-columns: 130px 1fr;
      column-gap: 8px;
    }
  }
}
</style>
