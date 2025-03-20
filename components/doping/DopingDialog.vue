<script setup lang="ts"></script>

<template>
  <v-dialog width="auto" min-width="400px" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" tile color="success" height="36px"
        >정보</v-btn
      >
    </template>
    <template #default="{ isActive }">
      <v-card class="doping-dialog" height="500px">
        <DopingContainer />
      </v-card>
      <div class="doping-dialog-close-container">
        <div class="doping-dialog-close">
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
div.doping-dialog {
  position: relative;
  background-color: rgba(var(--v-theme-background), 1);
  border-radius: 10px;
  padding: 16px;
  height: 500px;
}
div.doping-dialog-close-container {
  position: absolute;
  top: 0px;
  right: 0px;
  div.doping-dialog-close {
    position: absolute;
    top: -12px;
    right: -12px;
  }
}
</style>
