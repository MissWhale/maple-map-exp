import map from '@/assets/json/map.json';
export const DefaultMapList = map;
export const mapList = DefaultMapList.map((map) => {
  return {
    ...map,
    area: DefaultAreaList.find((area) => area.areaKey === map.areaKey)!,
    mob: map.mob.map((mob) => {
      return {
        ...DefaultMobList.find((info) => info.mobKey === mob)!,
      };
    }),
  };
}).map((info) => ({
  ...info,
  avgMobLevel:
    info.mob.reduce((acc, cur) => acc + cur.level, 0) / info.mob.length,
}));
