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
  padding: 3px 12px 4px;
  border-radius: 22px;
  span {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
  }
  &.short {
    padding: 3px 6px 4px;
    border-radius: 6px;
  }
  &.easy {
    color: white;
    background-image: linear-gradient(to bottom, #888888, #666666);
    border: 1px solid #bbbbbb;
  }
  &.normal {
    color: white;
    background-image: linear-gradient(to bottom, #51b2cc, #319dbc);
    border: 1px solid #44bbcc;
  }
  &.hard {
    color: white;
    background-image: linear-gradient(to bottom, #bb4466, #aa3355);
    border: 1px solid #cc5588;
  }
  &.chaos {
    color: #ffe1be;
    background-image: linear-gradient(to bottom, #333333, #222233);
    border: 1px solid #ffe1be;
  }
  &.extreme {
    color: #ee3355;
    background-image: linear-gradient(to bottom, #333333, #222233);
    border: 1px solid #ee3355;
  }
}
</style>
