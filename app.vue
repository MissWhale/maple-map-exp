<script setup lang="ts">
import 'vuesax-alpha/theme-chalk/index.css';
import 'vuesax-alpha/theme-chalk/dark/css-vars.css';
const { toggleTheme } = useTheme();
</script>

<template>
  <main>
    <vs-button @click="toggleTheme" color="primary">
      Hello World Vuesax + Nuxtjs
    </vs-button>
  </main>
</template>
