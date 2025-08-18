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
const checkedCount = computed(() => {
  return bossStore.totalCharacterList.filter((character) => character.cleared)
    .length;
});
</script>

<template>
  <section class="character-statistics-container card-container">
    <CommonCardHeader title="클리어 현황">
      <template #action>
        <div class="character-statistics-checked-count-container">
          <span class="character-statistics-checked-count">
            {{ checkedCount }} / {{ bossStore.totalCharacterList.length }}
          </span>
          <VBtn
            color="primary"
            @click="bossStore.changeAllCharacterCleared(true)"
          >
            모두 클리어
          </VBtn>
          <VBtn
            color="error"
            @click="bossStore.changeAllCharacterCleared(false)"
          >
            초기화
          </VBtn>
        </div>
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
  width: fit-content;
  .character-statistics-checked-count-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    margin-left: 32px;
    span.character-statistics-checked-count {
      font-size: 13px;
      font-weight: 600;
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 4px 12px;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(103, 126, 234, 0.3);
    }
  }

  ul.character-statistics-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 0;
  }

  ul.character-statistics-total {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e9ecef;

    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;

      &:not(:last-child) {
        border-bottom: 1px solid #e9ecef;
        padding-bottom: 12px;
      }

      div.character-statistics-total-item-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;

        span {
          &:first-child {
            font-weight: 600;
            font-size: 15px;
            color: #2c3e50;
          }

          &:last-child {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 13px;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(103, 126, 234, 0.2);
          }
        }
      }

      div.character-statistics-total-item-right {
        span {
          font-size: 15px;
          font-weight: 600;
          color: #667eea;
        }
      }

      // 남은 가격 항목에 대한 특별한 스타일
      &:nth-child(2) {
        div.character-statistics-total-item-right span {
          color: #ff6b6b;
        }
      }

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;

        div.character-statistics-total-item-left span:first-child {
          font-weight: 700;
          font-size: 16px;
        }

        div.character-statistics-total-item-right span {
          font-weight: 700;
          font-size: 16px;
          color: #2c3e50;
        }
      }
    }
  }
}
</style>
