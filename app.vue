<script setup lang="ts">
import { useBossStore } from './store';

const { toggle, isDark } = useCustomTheme();
const bossStore = useBossStore();
function handleClick(key: number) {
  console.log('click', key);
}
</script>

<template>
  <VApp :theme="isDark ? 'dark' : 'light'">
    <!-- <VBtn @click="toggle()" color="primary"> Hello World Vuesax + Nuxtjs </VBtn> -->
    <main>
      <CharacterContainer />
      <BossContainer :id="bossStore.selectCharacter" />
      <CharacterStatisticsContainer />
      <!-- <LevelContainer />
      <LevelCalculatorContainer />
      <LevelTotalExpContainer />
      <ExpCouponContainer />

      <ElixirContainer />
      <MonsterParkContainer />
      <QuestDailyContainer />
      <QuestWeeklyContainer /> -->
      <!-- <MapTable @click="handleClick" /> -->
      <!-- <HuntDialog /> -->
      <!-- <VBtn @click="dialogView = true">Open Dialog</VBtn> -->
      <!-- <DopingContainer /> -->
    </main>
  </VApp>
</template>

<style lang="scss">
main {
  background: rgba(var(--background), 1);
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // gap: 16px;
  // padding: 16px;
  // justify-content: center;
  // div.test {
  //   background: var(--color-background-soft);
  //   display: flex;
  //   margin: 0 auto;
  //   // width: 400px;
  //   // height: 400px;
  //   flex-direction: row;
  //   justify-content: center;
  //   align-items: flex-start;
  //   row-gap: 10px;
  // }
}
</style>
