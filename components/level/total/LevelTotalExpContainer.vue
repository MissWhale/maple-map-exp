<script setup lang="ts">
import {
  useLevelStore,
  useMonsterParkStore,
  useDailyQuestStore,
  useWeeklyQuestStore,
  useExpCouponStore,
  useElixirStore,
} from '~/store';

const level = useLevelStore();
const monsterPark = useMonsterParkStore();
const dailyQuest = useDailyQuestStore();
const weeklyQuest = useWeeklyQuestStore();
const expCoupon = useExpCouponStore();
const elixir = useElixirStore();

const HEADERS = [
  { title: '콘텐츠', class: 'contents' },
  { title: '경험치', class: 'exp' },
  { title: '퍼센트', class: 'percent' },
];
const infoList = computed(() => [
  {
    title: '몬스터 파크',
    exp: computed(() => monsterPark.totalMonsterParkExp),
    percent: computed(() =>
      calculatorPercent(
        monsterPark.totalMonsterParkExp,
        level.currentLevelMaxExp,
      ),
    ),
  },
  {
    title: '일일 퀘스트',
    exp: computed(() => dailyQuest.totalDailyQuestExp),
    percent: computed(() =>
      calculatorPercent(
        dailyQuest.totalDailyQuestExp,
        level.currentLevelMaxExp,
      ),
    ),
  },
  {
    title: '주간 퀘스트',
    exp: computed(() => weeklyQuest.totalWeeklyQuestExp),
    percent: computed(() =>
      calculatorPercent(
        weeklyQuest.totalWeeklyQuestExp,
        level.currentLevelMaxExp,
      ),
    ),
  },
  {
    title: '경험치 쿠폰',
    exp: computed(() => expCoupon.totalExpCouponExp),
    percent: computed(() =>
      calculatorPercent(expCoupon.totalExpCouponExp, level.currentLevelMaxExp),
    ),
  },
  {
    title: '엘릭서',
    exp: computed(() => elixir.totalElixirExp),
    percent: computed(() =>
      calculatorPercent(elixir.totalElixirExp, level.currentLevelMaxExp),
    ),
  },
  {
    title: '총 합계',
    exp: computed(
      () =>
        monsterPark.totalMonsterParkExp +
        dailyQuest.totalDailyQuestExp +
        weeklyQuest.totalWeeklyQuestExp +
        expCoupon.totalExpCouponExp +
        elixir.totalElixirExp,
    ),
    percent: computed(() =>
      calculatorPercent(
        monsterPark.totalMonsterParkExp +
          dailyQuest.totalDailyQuestExp +
          weeklyQuest.totalWeeklyQuestExp +
          expCoupon.totalExpCouponExp +
          elixir.totalElixirExp,
        level.currentLevelMaxExp,
      ),
    ),
  },
]);
</script>

<template>
  <section class="level-total-exp-container section">
    <div class="header">
      <p>경험치 계산표</p>
    </div>
    <table>
      <thead>
        <tr>
          <th
            v-for="header in HEADERS"
            :key="header.class"
            :class="header.class"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody class="info-list">
        <LevelTotalExpInfo
          v-for="info in infoList"
          :key="info.title"
          v-bind="info"
        />
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
@import './LevelTotalExp.scss';
</style>
