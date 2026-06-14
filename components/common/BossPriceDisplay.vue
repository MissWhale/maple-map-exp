<script setup lang="ts">
defineProps<{
  display: FormattedBossPrice;
  variant?: 'default' | 'total' | 'statistics';
}>();
</script>

<template>
  <div
    class="boss-price-display"
    :class="[`boss-price-display--${variant ?? 'default'}`]"
  >
    <span class="boss-price-display__main">{{ display.main }}</span>
    <span v-if="display.upcoming" class="boss-price-display__upcoming">
      {{ display.upcoming }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.boss-price-display {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;

  &__main {
    font-size: 14px;
    font-weight: 600;
    color: #667eea;
    line-height: 1.2;
  }

  &__upcoming {
    font-size: 10px;
    font-weight: 500;
    color: #95a5a6;
    line-height: 1.2;
  }

  &--total {
    .boss-price-display__main {
      font-size: 18px;
      font-weight: 700;
      color: white;
    }

    .boss-price-display__upcoming {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  &--statistics {
    .boss-price-display__main {
      font-size: 14px;
    }
  }
}
</style>
