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
      <span>{{ display.upcoming }}</span>
      <span
        v-if="display.changeRate"
        class="boss-price-display__rate"
        :class="`boss-price-display__rate--${display.changeDirection}`"
      >
        {{ display.changeRate }}
      </span>
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
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 500;
    color: #95a5a6;
    line-height: 1.2;
  }

  &__rate {
    font-weight: 600;

    &--down {
      color: #e74c3c;
    }

    &--up {
      color: #27ae60;
    }
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

    .boss-price-display__rate--down {
      color: #ffb3ab;
    }

    .boss-price-display__rate--up {
      color: #a8e6c1;
    }
  }

  &--statistics {
    .boss-price-display__main {
      font-size: 14px;
    }

    .boss-price-display__upcoming {
      font-size: 11px;
    }

    .boss-price-display__rate {
      font-size: 11px;
    }
  }
}
</style>
