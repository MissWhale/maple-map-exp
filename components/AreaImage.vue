<script setup lang="ts">
defineProps<{
  areaKey: number;
}>();
</script>

<template>
  <div class="area-image">
    <ImageAssets type="area" :number="areaKey" />
  </div>
</template>
