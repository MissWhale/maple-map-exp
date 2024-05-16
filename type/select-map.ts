export interface SelectMap {
  area: {
    name: string;
    areaKey: number;
    continent: number;
  };
  mob: {
    name: string;
    mobKey: number;
    level: number;
    exp: number;
    areaKey: number;
  }[];
  key: number;
  areaKey: number;
  name: string;
  force: number;
  regen: number;
  maxHour: number;
  avgMobLevel: number;
}
