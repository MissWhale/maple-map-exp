<script setup lang="ts">
const { toggle, isDark } = useCustomTheme();
function handleClick(key: number) {
  console.log('click', key);
}
const test = [
  { title: 'test1', value: 1, icon: 'mdi:account-arrow-down' },
  { title: 'test2', value: 2 },
  {
    title: 'test5',
    value: 5,
    icon: 'mdi:user',
    subList: [
      { title: 'test', value: 'test' },
      { title: 'test1', value: 'test1' },
    ],
  },
  { title: 'test3', value: 3 },
  { title: 'test4', value: 4 },
];
const select = ref([]);
const selectOne = ref();
</script>

<template>
  <VApp :theme="isDark ? 'dark' : 'light'">
    <main>
      <VBtn @click="toggle()" color="primary">
        Hello World Vuesax + Nuxtjs
      </VBtn>
      <!-- {{ select }}
      {{ selectOne }} -->
      <LevelContainer />
      <!-- <LevelCalculatorContainer />
        <ElixirContainer /> -->
      <MonsterParkContainer />
      <QuestDailyContainer />
      <!-- <MapTable @click="handleClick" /> -->
      <!-- <DopingContainer /> -->
    </main>
  </VApp>
</template>

<style lang="scss">
main {
  background: rgba(var(--background), 1);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1200px;
  justify-content: center;
  div.test {
    background: var(--color-background-soft);
    display: flex;
    margin: 0 auto;
    // width: 400px;
    // height: 400px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    row-gap: 10px;
  }
}
</style>
