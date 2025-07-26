<script setup lang="ts">
import { useHuntStore } from '~/store/hunt';

// const dialogView = defineModel<boolean>({
//   required: true,
//   default: false,
// });
const huntStore = useHuntStore();
const dialogView = ref<boolean>(false);
const step = ref<number>(0);
const selectHuntIndex = ref<number>(0);
const selectMapId = ref<number>(0);
const isEdit = ref<boolean>(false);
watch(dialogView, (value) => {
  if (value) {
    step.value = 0;
  }
});
function huntAdd() {
  selectHuntIndex.value = huntStore.addHunt();
  step.value = 1;
}
function mapSelect(mapId: number) {
  console.log('mapSelect', mapId);
  selectMapId.value = mapId;
  step.value = 2;
  isEdit.value = false;
}
function huntDetailClick(id: number) {
  selectHuntIndex.value = id;
  step.value = 2;
  isEdit.value = true;
}
function huntConfirm() {
  step.value = 0;
}
function huntCancel(id: number) {
  console.log('huntCancel', id);
  isEdit.value = false;
  step.value = 0;
  huntStore.deleteHunt(id);
}
</script>

<template>
  <v-dialog v-model="dialogView" max-width="1200" scrollable persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="primary">사냥정보</v-btn>
    </template>
    <template #default="{ isActive }">
      <div class="hunt-dialog">
        <div class="hunt-dialog-title">사냥정보</div>
        <PresetContainer />
        <v-window v-model="step">
          <v-window-item value="0">
            <HuntTable @addClick="huntAdd" @detailInfoClick="huntDetailClick" />
          </v-window-item>
          <v-window-item value="1">
            <MapTable @click="mapSelect" />
          </v-window-item>
          <v-window-item value="2">
            <HuntDetailCount
              :id="selectHuntIndex"
              :mapId="selectMapId"
              :isEdit="isEdit"
              @confirm="huntConfirm"
              @cancel="huntCancel"
            />
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
