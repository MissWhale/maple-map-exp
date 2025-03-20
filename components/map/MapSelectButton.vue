<script setup lang="ts">
import { useMapSettingStore } from '~/store';

const { mapTableHeader } = useMapSettingStore();
</script>

<template>
  <div class="map-select-button">
    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn color="primary" v-bind="props">행 설정</v-btn>
      </template>
      <v-list density="compact">
        <v-list-item v-for="header in mapTableHeader">
          <v-checkbox
            v-model="header.value"
            :label="header.name"
            density="compact"
            hide-details
          />
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped lang="scss">
div.map-select-button {
}
</style>
