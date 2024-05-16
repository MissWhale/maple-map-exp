<script setup lang="ts">
defineProps<{
  continent: number;
}>();
</script>

<template>
  <div class="force-image">
    <ImageAssets type="force" :number="continent" />
  </div>
</template>

<style scoped lang="scss">
div.force-image {
}
</style>
