<script setup lang="ts">
import { useBossStore } from '~/store';

const bossStore = useBossStore();
const totalInfo = computed(() => [
  {
    title: '총 클리어 가격',
    value: transformKoreanBossReward(bossStore.bossClearedPrice),
    count: bossStore.bossClearedCount,
  },
  {
    title: '남은 가격',
    value: transformKoreanBossReward(bossStore.notClearedPrice),
    count: bossStore.totalBossLength - bossStore.bossClearedCount,
  },
  {
    title: '총 가격',
    value: transformKoreanBossReward(bossStore.totalPrice),
    count: bossStore.totalBossLength,
  },
]);
</script>

<template>
  <section class="character-statistics-container card-container">
    <CommonCardHeader title="클리어 현황">
      <template #action>
        <VBtn
          color="primary"
          size="small"
          height="18.3px"
          @click="bossStore.changeAllCharacterCleared(true)"
        >
          모두 클리어
        </VBtn>
        <VBtn
          color="error"
          size="small"
          height="18.3px"
          @click="bossStore.changeAllCharacterCleared(false)"
        >
          초기화
        </VBtn>
      </template>
    </CommonCardHeader>
    <ul class="character-statistics-list">
      <CharacterStatistics
        v-for="character in bossStore.totalCharacterList"
        :key="character.id"
        :id="character.id"
        :name="character.name"
        :count="character.count"
        :cleared="character.cleared"
        :price="character.price"
        :updateCleared="character.updateCleared"
      />
    </ul>
    <ul class="character-statistics-total">
      <li v-for="item in totalInfo" :key="item.title">
        <div class="character-statistics-total-item-left">
          <span>{{ item.title }}</span>
          <span>{{ item.count }}</span>
        </div>
        <div class="character-statistics-total-item-right">
          <span>{{ item.value }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
section.character-statistics-container {
  width: 300px;
  ul.character-statistics-total {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid $secondary;
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      div.character-statistics-total-item-left {
        display: flex;
        flex-direction: row;
        gap: 8px;
        span {
          &:first-child {
            font-weight: 500;
          }
          &:last-child {
            background: $secondary;
            color: white;
            font-size: 14px;
            font-weight: 500;
            padding: 2px 4px;
            border-radius: 4px;
          }
        }
      }
      &:last-child {
        border-top: 1px solid $secondary;
        padding-top: 8px;
        span {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
