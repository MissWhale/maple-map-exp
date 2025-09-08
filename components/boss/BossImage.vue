<script setup lang="ts">
const props = defineProps<{
  id: number;
  isDifficulty?: boolean;
  difficulty?: BossDifficultyNumber | null;
}>();

const imagePosition = computed(() => {
  const findBoss = bossList.find((boss) => boss.id === props.id);
  return findBoss?.imagePosition ?? '0px 0px';
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
    default:
      return '';
  }
});
</script>

<template>
  <div class="boss-image-container">
    <div
      class="boss-item-image"
      :class="isDifficulty ? difficultyClass : ''"
      :style="{ backgroundPosition: imagePosition }"
    ></div>
    <BossDifficultyName
      v-if="isDifficulty"
      :difficulty="difficulty!"
      is-short
    />
  </div>
</template>

<style scoped lang="scss">
div.boss-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  div.boss-item-image {
    border-radius: 6px;
    background: url('@/assets/img/boss250908.png');
    width: 28px;
    height: 28px;
    object-fit: contain;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &.easy {
      width: 30px;
      height: 30px;
      border: 2px solid #bbbbbb;
      border-radius: 8px;
    }
    &.normal {
      width: 30px;
      height: 30px;
      border: 2px solid #44bbcc;
      border-radius: 8px;
    }
    &.hard {
      width: 30px;
      height: 30px;
      border: 2px solid #cc5588;
      border-radius: 8px;
    }
    &.chaos {
      width: 30px;
      height: 30px;
      border: 2px solid #ffe1be;
      border-radius: 8px;
    }
    &.extreme {
      width: 30px;
      height: 30px;
      border: 2px solid #ee3355;
      border-radius: 8px;
    }
  }
}
</style>
