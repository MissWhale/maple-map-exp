<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="common-card-header">
    <p>{{ title }}</p>
    <div class="common-card-header-action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped lang="scss">
div.common-card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  p {
    font-size: 18px;
    font-weight: 600;
  }
  div.common-card-header-action {
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
