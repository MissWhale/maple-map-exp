<script setup lang="ts">
import { useHuntStore } from '~/store';

const huntStore = useHuntStore();
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const { minuteCount, totalHuntCount } = useHuntTime(props.id);
</script>

<template>
  <div class="hunt-detail-time-container">
    <p>사냥 시간</p>
    <ul>
      <li class="hunt-time-input">
        <v-text-field
          v-model="huntStore.huntList[props.id].huntTime"
          hideDetails
          type="number"
        />
        <span>분당</span>
        <v-text-field
          v-model="huntStore.huntList[props.id].huntCount"
          hideDetails
          type="number"
        />
        <span>마리</span>
      </li>
      <div class="minute-count">
        <span>1분당</span>
        <span>{{ Math.round(minuteCount) }}</span>
        <span>마리</span>
      </div>
      <li class="hunt-total-time-input">
        <v-text-field
          v-model="huntStore.huntList[props.id].huntTotalTime"
          hideDetails
          type="number"
        />
        <span>분</span>
      </li>
      <div class="total-minute-count">
        <span>총 마리수 {{ makeComma(totalHuntCount) }}</span>
      </div>
    </ul>
  </div>
</template>

<style scoped lang="scss">
div.hunt-detail-time-container {
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
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &.hunt-time-input,
      &.hunt-total-time-input {
        display: flex;
        gap: 8px;
        span {
          font-size: 14px;
          min-width: 30px;
        }
      }
    }
    div.minute-count,
    div.total-minute-count {
      padding: 8px;
      font-size: 14px;
    }
  }
}
</style>
