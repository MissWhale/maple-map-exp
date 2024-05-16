<script setup lang="ts">
import 'vuesax-alpha/theme-chalk/index.css';
import 'vuesax-alpha/theme-chalk/dark/css-vars.css';
import '@/assets/global.css';
const { toggleTheme } = useTheme();
function handleClick(key: number) {
  console.log('click', key);
}
</script>

<template>
  <main>
    <vs-button @click="toggleTheme" color="primary">
      Hello World Vuesax + Nuxtjs
    </vs-button>
    <SelectMapTable @click="handleClick" />
  </main>
</template>

<style lang="scss">
main {
  background: rgba(var(--background), 1);
}
</style>
