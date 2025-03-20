<script setup lang="ts">
const props = defineProps<{
  id: string;
  name: string;
  count: number;
  cleared: boolean;
  price: number;
  updateCleared: () => void;
}>();
</script>

<template>
  <li class="character-statistics-item" :class="{ cleared }">
    <div class="character-statistics-item-left" @click="updateCleared">
      <VCheckbox :model-value="cleared" color="primary" hide-details readonly />
      <span class="character-statistics-item-name">{{ name }}</span>
      <span class="character-statistics-item-count">{{ count }}</span>
    </div>
    <div class="character-statistics-item-right">
      <span>{{ transformKoreanBossReward(price) }}</span>
    </div>
  </li>
</template>
<style lang="scss">
li.character-statistics-item {
  div.v-selection-control {
    min-height: 28px;
  }
}
</style>
<style scoped lang="scss">
li.character-statistics-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: 0.5;
  &.cleared {
    opacity: 1;
  }
  div.character-statistics-item-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    span.character-statistics-item-name {
      font-size: 16px;
      font-weight: 600;
    }
    span.character-statistics-item-count {
      background: $secondary;
      color: white;
      font-size: 14px;
      font-weight: 500;
      padding: 2px 4px;
      border-radius: 4px;
    }
  }
  div.character-statistics-item-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
