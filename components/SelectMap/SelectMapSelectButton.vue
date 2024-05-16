<script setup lang="ts">
import { useMapSettingStore } from '~/store';

const active = ref(false);
const { mapTableHeader } = useMapSettingStore();
</script>

<template>
  <div class="select-map-select-button">
    <vs-tooltip v-model="active" placement="bottom" trigger="click">
      <vs-button type="gradient" @click="active = !active">행 설정</vs-button>
      <template #content>
        <div v-for="header in mapTableHeader">
          <vs-checkbox v-model="header.value">{{ header.name }}</vs-checkbox>
        </div>
      </template>
    </vs-tooltip>
  </div>
</template>

<style scoped lang="scss">
div.select-map-select-button {
}
</style>
