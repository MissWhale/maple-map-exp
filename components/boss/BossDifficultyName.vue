<script setup lang="ts">
const props = defineProps<{
  difficulty: BossDifficultyNumber;
  isShort?: boolean;
}>();
const difficultyName = computed(() => {
  const name = BossReward[props.difficulty];
  return props.isShort ? name.slice(0, 1).toUpperCase() : name;
});
const difficultyClass = computed(() => {
  switch (props.difficulty) {
    case 0:
      return 'easy';
    case 1:
      return 'normal';
    case 2:
      return 'hard';
    case 3:
      return 'chaos';
    case 4:
      return 'extreme';
  }
});
</script>

<template>
  <div
    class="boss-difficulty-name"
    :class="[difficultyClass, { short: isShort }]"
  >
    <span>{{ difficultyName }}</span>
  </div>
</template>

<style scoped lang="scss">
div.boss-difficulty-name {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px 5px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  span {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  &.short {
    padding: 3px 6px 4px;
    border-radius: 6px;

    span {
      font-size: 10px;
    }
  }

  &.easy {
    color: white;
    background: linear-gradient(135deg, #888888 0%, #666666 100%);
    border: 1px solid #bbbbbb;
  }

  &.normal {
    color: white;
    background: linear-gradient(135deg, #51b2cc 0%, #319dbc 100%);
    border: 1px solid #44bbcc;
  }

  &.hard {
    color: white;
    background: linear-gradient(135deg, #bb4466 0%, #aa3355 100%);
    border: 1px solid #cc5588;
  }

  &.chaos {
    color: #ffe1be;
    background: linear-gradient(135deg, #333333 0%, #222233 100%);
    border: 1px solid #ffe1be;
  }

  &.extreme {
    color: #ee3355;
    background: linear-gradient(135deg, #333333 0%, #222233 100%);
    border: 1px solid #ee3355;
  }
}
</style>
