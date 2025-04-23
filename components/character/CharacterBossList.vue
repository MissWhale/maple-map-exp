<script setup lang="ts">
import type { CharacterBoss } from '~/store';

const props = defineProps<{
  bossList: CharacterBoss[];
}>();
const bossList = computed(() => {
  return props.bossList.sort((a, b) => a.id - b.id);
});
</script>

<template>
  <ul class="character-boss-list">
    <li v-for="boss in bossList" :key="boss.id" class="character-boss-item">
      <BossImage :id="boss.id" :difficulty="boss.difficulty" is-difficulty />
      <span class="boss-item-name">{{ boss.name }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul.character-boss-list {
  display: flex;
  flex-direction: row;
  gap: 6px;
  li.character-boss-item {
    display: flex;
    align-items: center;
  }
}
</style>
