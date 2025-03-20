<script setup lang="ts">
const props = defineProps<{
  rewardByDifficulty: number[];
  checkedIndex: number | null;
}>();

const emit = defineEmits<{
  (e: 'change', event: number): void;
}>();

const difficultyList = computed(() => {
  return props.rewardByDifficulty
    .map((reward, index) => ({
      checked: props.checkedIndex === index,
      difficulty: index,
      reward,
    }))
    .filter((difficulty) => difficulty.reward !== 0);
});

function handleChange(difficulty: number) {
  emit('change', difficulty);
}
</script>

<template>
  <ul class="boss-difficulty">
    <li
      class="boss-difficulty-item"
      v-for="difficulty in difficultyList"
      :key="difficulty.difficulty"
      @click="handleChange(difficulty.difficulty)"
    >
      <VCheckbox
        :model-value="difficulty.checked"
        color="primary"
        hide-details
        readonly
      />
      <BossDifficultyName :difficulty="difficulty.difficulty" />
    </li>
  </ul>
</template>
<style lang="scss">
ul.boss-difficulty {
  li.boss-difficulty-item {
    div.v-selection-control {
      min-height: 28px;
    }
  }
}
</style>
<style scoped lang="scss">
ul.boss-difficulty {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 6px;
  li.boss-difficulty-item {
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    span {
      text-transform: capitalize;
    }
  }
}
</style>
