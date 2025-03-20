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
      price:
        findInfo && findInfo.difficulty
          ? transformKoreanBossReward(
              Math.floor(
                boss.rewardByDifficulty[findInfo.difficulty] / findInfo.member,
              ),
            )
          : null,
    };
  });
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
  }
  div.boss-container-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }
}
</style>
