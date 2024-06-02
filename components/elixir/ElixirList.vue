<script setup lang="ts">
import type { ElixirInfo } from '~/type/elixir';

defineProps<{
  elixirList: Array<ElixirInfo>;
}>();
</script>

<template>
  <ul class="elixir-ul">
    <ElixirInfo
      v-for="elixir in elixirList"
      :key="elixir.key"
      :elixirInfo="elixir"
    />
  </ul>
</template>

<style scoped lang="scss">
ul.elixir-ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
