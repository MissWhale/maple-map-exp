import map from '@/assets/json/map.json';
export const DefaultMapList = map;
export const mapList = DefaultMapList.map((map) => {
  return {
    ...map,
    area: DefaultAreaList.find((area) => area.areaKey === map.areaKey),
    mob: map.mob.map((mob) => {
      return {
        mob: DefaultMobList.find((mob) => mob.mobKey === mob.mobKey),
      };
    }),
  };
});
