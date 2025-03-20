<script setup lang="ts">
const props = defineProps<{
  continent: number;
}>();
const continent = computed(() => (props.continent > 1 ? 1 : 0));
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
