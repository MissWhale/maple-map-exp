<script setup lang="ts">
import { useAutoSetStore, useLevelStore, useMonsterParkStore } from '~/store';
import type { CalculatorInput } from '~/type/doping/caculator-input';
import type { MonsterParkInput } from '~/type/monster-park';

const monsterPark = useMonsterParkStore();
const levelStore = useLevelStore();
const autuSetStore = useAutoSetStore();

const extreamMonsterParkExp = computed(() =>
  getExtreamMonsterParkExp(levelStore.level),
);
const inputList = ref<MonsterParkInput[]>(
  monsterPark.monsterParkList.map((x, i) => {
    if (i > 6) {
      return {
        label: `${i}`,
        value: computed({
          get() {
            return levelStore.level < 260
              ? false
              : monsterPark.monsterParkList[i];
          },
          set(value) {
            monsterPark.monsterParkList[i] = value;
          },
        }),
        type: 'number',
        inputType: 'switch',
        exp: computed(() => {
          if (monsterPark.monsterParkList[i]) {
            const exp =
              extreamMonsterParkExp.value *
              (1 + autuSetStore.totalMonsterParkAddExp / 100);
            return Math.round(exp);
          } else {
            return 0;
          }
        }),
        expPer: computed(() => {
          if (monsterPark.monsterParkList[i]) {
            const exp =
              extreamMonsterParkExp.value *
              (1 + autuSetStore.totalMonsterParkAddExp / 100);
            const currentLevelMaxExp = getMaxExp(levelStore.level);
            return +((exp / currentLevelMaxExp) * 100).toFixed(3);
          } else {
            return 0;
          }
        }),
        disabled: computed(() => levelStore.level < 260),
      };
    } else
      return {
        label: `${i}`,
        value: computed({
          get() {
            return monsterPark.monsterParkList[i];
          },
          set(value) {
            monsterPark.monsterParkList[i] = value;
          },
        }),
        type: 'number',
        inputType: 'select',
        options: computed(() => monsterPark.activeMonsterParkSelectList),
        optionLabel: 'name',
        optionValue: 'key',
        exp: computed(() => {
          if (monsterPark.monsterParkList[i] !== null) {
            const data = MonsterPark.find(
              (y) => y.key === monsterPark.monsterParkList[i],
            );
            if (data) {
              return Math.round(
                data.exp * (1 + autuSetStore.totalMonsterParkAddExp / 100),
              );
            } else {
              return 0;
            }
          } else return 0;
        }),
        expPer: computed(() => {
          const currentLevelMaxExp = getMaxExp(levelStore.level);
          const data = MonsterPark.find(
            (y) => y.key === monsterPark.monsterParkList[i],
          );
          if (data) {
            return +(
              ((data.exp * (1 + autuSetStore.totalMonsterParkAddExp / 100)) /
                currentLevelMaxExp) *
              100
            ).toFixed(3);
          } else {
            return 0;
          }
        }),
        disabled: computed(() => levelStore.level < 105),
      };
  }),
);
const isMonsterParkDisabled = computed(() => levelStore.level < 105);

const addExpMenu = ref(false);
const addExpList = ref<CalculatorInput[]>([
  {
    label: '팀 시너지 - 몬스터파크 레벨',
    value: computed({
      get() {
        return autuSetStore.monsterPark.expAdd;
      },
      set(value) {
        autuSetStore.monsterPark.expAdd = value;
      },
    }),
    type: 'number',
    inputType: 'select',
    options: MonsterParkExpAddList,
    optionLabel: 'name',
    optionValue: 'id',
  },
  {
    label: '추가 경험치',
    value: computed({
      get() {
        return autuSetStore.monsterPark.etcExpAdd;
      },
      set(value) {
        if (+value < 0) {
          autuSetStore.monsterPark.etcExpAdd = 0;
        } else {
          autuSetStore.monsterPark.etcExpAdd = +value;
        }
      },
    }),
    type: 'number',
    inputType: 'input',
    options: [],
    optionLabel: '',
    optionValue: '',
  },
]);
const menuText = computed(() => {
  return `추가경험치 ${autuSetStore.totalMonsterParkAddExp}%`;
});

const resetClick = () => {
  monsterPark.monsterParkReset();
};

const runClick = (n: number) => {
  monsterPark.runMonsterPark(n);
};
</script>

<template>
  <section class="monster-park-container section">
    <div class="monster-park-container-header header">
      <p>몬스터 파크</p>
    </div>
    <div class="monster-park-actions">
      <VMenu :disabled="isMonsterParkDisabled">
        <template #activator="{ props }">
          <VBtn color="blue-lighten-4" v-bind="props">실행횟수</VBtn>
        </template>
        <VList>
          <VListItem v-for="i in 7" :key="i" @click="runClick(i)">{{
            i
          }}</VListItem>
        </VList>
      </VMenu>
      <VMenu v-model="addExpMenu" :close-on-content-click="false">
        <template #activator="{ props }">
          <VBtn color="blue-lighten-5" v-bind="props">{{ menuText }}</VBtn>
        </template>
        <MonsterParkExpContainer :list="addExpList" />
      </VMenu>
      <VBtn color="error" @click="resetClick">초기화</VBtn>
    </div>
    <MonsterParkInputList :list="inputList" />
  </section>
</template>

<style scoped lang="scss">
section.monster-park-container {
  min-width: 652px;
  div.monster-park-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 8px;
  }
}
</style>
