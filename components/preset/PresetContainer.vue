<script setup lang="ts">
import { usePresetStore } from '~/store/setting/preset';

const presetStore = usePresetStore();
const isEdit = ref(false);
const changeName = ref<string | null>(null);
function renameClick() {
  const changeNameInput = document.getElementById(
    'change-name',
  ) as HTMLInputElement;
  if (changeNameInput) {
    nextTick(() => {
      changeNameInput.focus();
    });
  }
  changeName.value = presetStore.currentPreset;
  isEdit.value = true;
}
function renamePresetConfirmClick() {
  if (changeName.value) {
    if (
      presetStore.currentPreset !== changeName.value &&
      presetStore.duplciateName(changeName.value) > -1
    ) {
      return;
    }
    presetStore.renamePreset(presetStore.currentPreset, changeName.value);
    isEdit.value = false;
  }
}
function renamePresetCancelClick() {
  isEdit.value = false;
}
function deleteClick(name: string) {
  if (presetStore.deletePreset(name)) {
    presetStore.changeCurrentPreset(presetStore.presetList[0].name);
  } else {
    alert('한개의 프리셋은 반드시 존재해야합니다.');
  }
}
</script>

<template>
  <div class="preset-wrap">
    <div v-show="!isEdit" class="preset-select-wrap">
      <div class="preset-select">
        <span class="preset-name">프리셋</span>
        <VSelect
          :model-value="presetStore.currentPreset"
          :items="presetStore.presetList"
          itemTitle="name"
          color="primary"
          hide-details
          @update:modelValue="presetStore.changeCurrentPreset"
        >
          <template #item="{ item, props }">
            <VListItem v-bind="props" :title="item.title">
              <template #append>
                <VBtn
                  icon="mdi-delete"
                  variant="plain"
                  @click="deleteClick(item.title)"
                ></VBtn>
              </template>
            </VListItem>
          </template>
        </VSelect>
        <VBtn
          color="primary"
          icon="mdi-plus"
          tile
          size="large"
          @click="presetStore.addPreset()"
        ></VBtn>
        <DopingDialog />
      </div>
      <div class="preset-update">
        <VBtn density="default" color="secondary" @click="renameClick"
          >이름변경</VBtn
        >
        <VBtn
          density="default"
          color="error"
          @click="deleteClick(presetStore.currentPreset)"
        >
          삭제
        </VBtn>
      </div>
    </div>
    <div v-show="isEdit" class="preset-change-name-wrap">
      <div class="preset-change-name">
        <span class="preset-name">프리셋</span>
        <VTextField
          v-model="changeName"
          id="change-name"
          color="primary"
          hide-details
          autofocus
          focused
          @keyup.enter="renamePresetConfirmClick()"
        />
      </div>
      <div class="preset-update">
        <VBtn
          density="default"
          color="success"
          @click="renamePresetConfirmClick()"
          >변경</VBtn
        >
        <VBtn density="default" color="error" @click="renamePresetCancelClick()"
          >취소</VBtn
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.preset-wrap {
  div.preset-select-wrap,
  div.preset-change-name-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    div.preset-select,
    div.preset-change-name {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
    }
    div.preset-update {
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
