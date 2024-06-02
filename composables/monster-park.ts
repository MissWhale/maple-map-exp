import monsterPark from '@/assets/json/monster-park.json';
import monsterParkType from '@/assets/json/monster-park-type.json';
import extreamMonsterPark from '@/assets/json/extream-monster-park.json';
export const MonsterPark = monsterPark;
export const MonsterParkType = monsterParkType;

export const MonsterParkExpAddList = range(0, 7).map((id) => {
  const value = id === 0 ? 0 : id === 1 ? 5 : id * 10 - 10;
  return {
    id,
    name: `${id}레벨 : ${value}%`,
    value,
  };
});

export const getExtreamMonsterParkExp = (level: number) => {
  const findData = extreamMonsterPark.find((x) => x.level === +level);
  return findData?.exp || 0;
};
