<script setup lang="ts">
const dialogView = defineModel<boolean>({
  required: true,
  default: false,
});
</script>

<template>
  <v-dialog v-model="dialogView" persistent>
    <div class="map-dialog">
      <div class="map-dialog-close">
        <VBtn @click="dialogView = false" icon="mdi-close" color="error"></VBtn>
      </div>
      <div class="map-dialog-title">사냥정보</div>
    </div>
  </v-dialog>
</template>

<style scoped lang="scss">
div.map-dialog {
  position: relative;
  background-color: rgba(var(--v-theme-background), 1);
  border-radius: 10px;
  padding: 16px;
  div.map-dialog-close {
    position: absolute;
    top: -12px;
    right: -12px;
  }
  div.map-dialog-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }
}
</style>
