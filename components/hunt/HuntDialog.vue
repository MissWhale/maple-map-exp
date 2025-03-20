<script setup lang="ts">
// const dialogView = defineModel<boolean>({
//   required: true,
//   default: false,
// });
const dialogView = ref<boolean>(false);
const step = ref<number>(0);
watch(dialogView, (value) => {
  if (value) {
    step.value = 0;
  }
});

function mapSelect(mapId: number) {
  console.log('mapSelect', mapId);
  step.value = 2;
}
</script>

<template>
  <v-dialog v-model="dialogView" max-width="1200" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="primary">사냥정보</v-btn>
    </template>
    <template #default="{ isActive }">
      <div class="hunt-dialog">
        <div class="hunt-dialog-title">사냥정보</div>
        <PresetContainer />
        <v-window v-model="step">
          <v-window-item value="0">
            <HuntTable @addClick="step = 1" />
          </v-window-item>
          <v-window-item value="1">
            <MapTable @click="mapSelect" />
          </v-window-item>
        </v-window>
        <div class="hunt-dialog-close">
          <VBtn
            @click="isActive.value = false"
            icon="mdi-close"
            color="error"
          ></VBtn>
        </div>
      </div>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">
div.hunt-dialog {
  position: relative;
  background-color: rgba(var(--v-theme-background), 1);
  border-radius: 10px;
  padding: 16px;
  div.hunt-dialog-close {
    position: absolute;
    top: -12px;
    right: -12px;
  }
  div.hunt-dialog-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }
}
</style>
