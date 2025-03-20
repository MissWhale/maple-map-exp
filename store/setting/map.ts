export const useMapSettingStore = defineStore(
  'mapSetting',
  () => {
    const mapTableHeader = ref([
      {
        name: '지역',
        class: 'area',
        value: true,
      },
      {
        name: '맵',
        class: 'map',
        value: true,
      },
      {
        name: '포스',
        class: 'force',
        value: true,
      },
      {
        name: '젠수',
        class: 'regen',
        value: true,
      },
      {
        name: '최대 마리수',
        class: 'max-hour',
        value: true,
      },
      {
        name: '평균 레벨',
        class: 'level',
        value: true,
      },
      {
        name: '몬스터',
        class: 'monster',
        value: true,
      },
    ]);

    return {
      mapTableHeader,
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
