export interface MobValue {
  name: string;
  value: number | string | null;
}
export interface MobInfo {
  level: number;
  name: string;
  dopingExp: number;
  dopingMeso: number;
  nonLevelDopingExp: number;
  valueList: MobValue[];
}
