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
  padding: 12px 16px;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  opacity: 0.6;

  &.cleared {
    opacity: 1;
    background: rgba(103, 126, 234, 0.05);
    border-color: rgba(103, 126, 234, 0.2);
  }

  div.character-statistics-item-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    cursor: pointer;

    span.character-statistics-item-name {
      font-size: 15px;
      font-weight: 600;
      color: #2c3e50;
    }

    span.character-statistics-item-count {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 12px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(103, 126, 234, 0.2);
    }
  }

  div.character-statistics-item-right {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      font-size: 14px;
      font-weight: 600;
      color: #667eea;
    }
  }
}
</style>
