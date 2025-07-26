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
  gap: 6px;
  div.boss-item-image {
    border-radius: 4px;
    background: url('@/assets/img/boss.png');
    width: 25px;
    height: 25px;
    object-fit: contain;
    &.easy {
      width: 27px;
      height: 27px;
      border: 2px solid #bbbbbb;
    }
    &.normal {
      width: 27px;
      height: 27px;
      border: 2px solid #44bbcc;
    }
    &.hard {
      width: 27px;
      height: 27px;
      border: 2px solid #cc5588;
    }
    &.chaos {
      width: 27px;
      height: 27px;
      border: 2px solid #ffe1be;
    }
    &.extreme {
      width: 27px;
      height: 27px;
      border: 2px solid #ee3355;
    }
  }
}
</style>
