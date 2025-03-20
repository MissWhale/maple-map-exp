import type { Exp } from '~/type/doping/exp';
import type { ItemDrop } from '~/type/doping/item-drop';
import type { Meso } from '~/type/doping/meso';
import {
  DEFAULT_EXP,
  DEFAULT_MESO,
  DEFAULT_ITEM_DROP,
} from '~/composables/doping';

type Preset = {
  name: string;
  changeName: string;
  exp: Exp;
  meso: Meso;
  itemDrop: ItemDrop;
};
const DEFAULT_PRESET: Preset = {
  name: '프리셋 1',
  changeName: '프리셋 1',
  exp: { ...DEFAULT_EXP },
  meso: { ...DEFAULT_MESO },
  itemDrop: { ...DEFAULT_ITEM_DROP },
};

export const usePresetStore = defineStore(
  'preset',
  () => {
    const presetList = ref<Preset[]>([DEFAULT_PRESET]);
    const currentPreset = ref<string>('프리셋 1');
    const currentPresetIndex = computed(() => {
      return presetList.value.findIndex(
        (preset) => preset.name === currentPreset.value,
      );
    });
    function addPreset(index?: number) {
      const length = index || presetList.value.length + 1;
      const newName = `프리셋 ${length}`;
      const isDuplicate = duplciateName(newName);
      if (isDuplicate < 0) {
        presetList.value.push({
          ...DEFAULT_PRESET,
          name: newName,
          changeName: newName,
        });
        currentPreset.value = newName;
      } else {
        addPreset(length + 1);
      }
    }
    function currentPresetFind() {
      return (
        presetList.value.find(
          (preset) => preset.name === currentPreset.value,
        ) || {
          ...DEFAULT_PRESET,
          name: currentPreset.value,
          changeName: currentPreset.value,
        }
      );
    }
    function changeCurrentPreset(name: string) {
      currentPreset.value = name;
    }
    function renamePreset(name: string, newName: string) {
      if (name === currentPreset.value) {
        return;
      }
      const preset = presetList.value.findIndex(
        (preset) => preset.name === name,
      );
      if (preset > -1) {
        const newPreset = {
          ...presetList.value[preset],
          name: newName,
          changeName: newName,
        };
        presetList.value.splice(preset, 1, newPreset);
        currentPreset.value = newPreset.name;
      }
    }
    function deletePreset(name: string) {
      if (presetList.value.length > 1) {
        const findIndex = presetList.value.findIndex(
          (preset) => preset.name === name,
        );
        if (name === currentPreset.value) {
          currentPreset.value =
            presetList.value[currentPresetIndex.value === 0 ? 1 : 0].name;
        }
        presetList.value.splice(findIndex, 1);
        return true;
      } else {
        return false;
      }
    }
    function duplciateName(name: string) {
      return presetList.value.findIndex((preset) => preset.name === name);
    }
    onMounted(() => {
      if (presetList.value.length === 0) {
        addPreset();
      }
    });
    return {
      presetList,
      currentPreset,
      changeCurrentPreset,
      currentPresetFind,
      addPreset,
      renamePreset,
      deletePreset,
      duplciateName,
      currentPresetIndex,
    };
  },
  {
    persist: [
      {
        storage: persistedState.localStorage,
      },
    ],
  },
);
