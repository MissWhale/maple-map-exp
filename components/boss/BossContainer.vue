<script setup lang="ts">
import { useBossStore, type CharacterBoss } from '~/store';

const props = defineProps<{
  id: string | null;
  // boss: CharacterBoss[];
}>();

const bossStore = useBossStore();

const characterBoss = computed(() => {
  return props.id
    ? bossStore.characterList.find((c) => c.id === props.id)?.boss ?? []
    : [];
});

const selectBoss = computed(() => {
  return bossList.map((boss) => {
    const findInfo = characterBoss.value.find((b) => b.id === boss.id);
    return {
      ...boss,
      checkedIndex: findInfo?.difficulty ?? null,
      member: findInfo?.member ?? 1,
      originalPrice:
        findInfo && findInfo.difficulty !== null
          ? boss.rewardByDifficulty[findInfo.difficulty] / findInfo.member
          : 0,
      price:
        findInfo && findInfo.difficulty !== null
          ? transformKoreanBossReward(
              Math.floor(
                boss.rewardByDifficulty[findInfo.difficulty] / findInfo.member,
              ),
            )
          : null,
    };
  });
});
const totalPrice = computed(() => {
  return transformKoreanBossReward(
    Math.floor(
      selectBoss.value.reduce((acc, boss) => {
        return acc + (boss.originalPrice ?? 0);
      }, 0),
    ),
  );
});

function handleChange(bossId: number, difficulty: BossDifficultyNumber | null) {
  bossStore.updateCharacterBoss(bossId, difficulty);
}

function handleMemberChange(bossId: number, member: number) {
  bossStore.updateCharacterBossMember(bossId, member);
}
</script>

<template>
  <section class="boss-container card-container">
    <CommonCardHeader title="보스 선택" />
    <ul v-if="bossStore.selectCharacter" class="boss-list">
      <li class="boss-item" v-for="boss in selectBoss" :key="boss.id">
        <BossImage :id="boss.id" />
        <span class="boss-item-name">{{ boss.name }}</span>
        <BossDifficulty
          :reward-by-difficulty="boss.rewardByDifficulty"
          :checked-index="boss.checkedIndex"
          @change="handleChange(boss.id, $event)"
        />
        <BossMember
          :member="boss.member"
          :boss-id="boss.id"
          :disabled="boss.checkedIndex === null"
          @change="handleMemberChange(boss.id, $event)"
        />
        <span class="boss-price">{{ boss.price }}</span>
      </li>
      <li class="boss-total-price">
        <span class="boss-total-price-value">{{ totalPrice }}</span>
      </li>
    </ul>
    <div v-else class="boss-container-empty">
      <p>캐릭터를 선택해주세요.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
section.boss-container {
  ul.boss-list {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    gap: 6px;
    li.boss-item {
      display: grid;
      grid-template-columns: 25px 70px 1fr 75px 110px;
      gap: 8px;
      justify-content: flex-start;
      align-items: center;
      padding: 2px 0;
      span.boss-item-name {
        font-size: 14px;
        font-weight: 500;
      }
      span.boss-price {
        font-size: 14px;
        font-weight: 500;
        text-align: right;
      }
    }
    li.boss-total-price {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 4px;
      border-top: 1px solid #e0e0e0;
      padding-top: 8px;
      margin-top: 8px;
      span.boss-total-price-value {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  div.boss-container-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }
}
</style>
