<script setup lang="ts">
import { useBossStore, type CharacterBoss } from '~/store';

const props = defineProps<{
  id: string | null;
  // boss: CharacterBoss[];
}>();

const bossStore = useBossStore();
const bossPriceNow = useBossPriceNow();

const characterBoss = computed(() => {
  return props.id
    ? (bossStore.characterList.find((c) => c.id === props.id)?.boss ?? [])
    : [];
});

const selectBoss = computed(() => {
  const date = bossPriceNow.value;
  return bossList
    .sort((a, b) => a.orders - b.orders)
    .map((boss) => {
      const findInfo = characterBoss.value.find((b) => b.id === boss.id);
      const member = findInfo?.member ?? 1;
      const difficulty = findInfo?.difficulty ?? null;
      const originalPrice =
        difficulty !== null
          ? getBossRewardAmount(
              boss.rewardByDifficulty,
              boss.rewardByDifficultyNew,
              difficulty,
              member,
              date,
            )
          : 0;
      const priceDisplay =
        difficulty !== null
          ? formatBossPriceDisplay(
              boss.rewardByDifficulty,
              boss.rewardByDifficultyNew,
              difficulty,
              member,
              date,
            )
          : null;

      return {
        ...boss,
        checkedIndex: difficulty,
        member,
        originalPrice,
        priceDisplay,
      };
    });
});
const totalPrice = computed(() => {
  const date = bossPriceNow.value;
  const amount = Math.floor(
    selectBoss.value.reduce((acc, boss) => {
      return acc + (boss.originalPrice ?? 0);
    }, 0),
  );
  const upcomingAmount = sumUpcomingBossRewardAmounts(
    selectBoss.value
      .filter((boss) => boss.checkedIndex !== null)
      .map((boss) => ({
        rewardByDifficulty: boss.rewardByDifficulty,
        rewardByDifficultyNew: boss.rewardByDifficultyNew,
        difficulty: boss.checkedIndex,
        member: boss.member,
      })),
    date,
  );

  return formatBossTotalPriceDisplay(amount, upcomingAmount, date);
});

const selectedCharacter = computed(() => {
  return bossStore.characterList.find(
    (c) => c.id === bossStore.selectCharacter,
  );
});

const selectedBossCount = computed(() => {
  return selectBoss.value.filter((boss) => boss.checkedIndex !== null).length;
});

const isMaxBossCount = computed(() => {
  return selectedBossCount.value === 12 || bossStore.totalBossLength >= 90;
});

function handleChange(bossId: number, difficulty: BossDifficultyNumber | null) {
  bossStore.updateCharacterBoss(bossId, difficulty);
}

function handleMemberChange(bossId: number, member: number) {
  bossStore.updateCharacterBossMember(bossId, member);
}
</script>

<template>
  <section
    class="boss-container card-container"
    @go-to-characters="$emit('go-to-characters')"
  >
    <CommonCardHeader title="보스 선택">
      <template #action>
        <div v-if="selectedCharacter" class="selected-info">
          <span class="character-name">{{ selectedCharacter.name }}</span>
          <span class="boss-count">{{ selectedBossCount }}개 보스</span>
        </div>
      </template>
    </CommonCardHeader>
    <ul v-if="bossStore.selectCharacter" class="boss-list">
      <li
        class="boss-item"
        :class="{
          'has-selected-difficulty': boss.checkedIndex !== null,
          disabled: isMaxBossCount && boss.checkedIndex === null,
        }"
        v-for="boss in selectBoss"
        :key="boss.id"
      >
        <BossImage :id="boss.id" />
        <span class="boss-item-name">{{ boss.name }}</span>
        <BossDifficulty
          :reward-by-difficulty="boss.rewardByDifficulty"
          :checked-index="boss.checkedIndex"
          :disabled="isMaxBossCount && boss.checkedIndex === null"
          @change="handleChange(boss.id, $event as BossDifficultyNumber)"
        />
        <BossMember
          :member="boss.member"
          :boss-id="boss.id"
          :disabled="boss.checkedIndex === null"
          @change="handleMemberChange(boss.id, $event)"
        />
        <CommonBossPriceDisplay
          v-if="boss.priceDisplay"
          :display="boss.priceDisplay"
          class="boss-price"
        />
      </li>
      <li class="boss-total-price">
        <CommonBossPriceDisplay :display="totalPrice" variant="total" />
      </li>
    </ul>
    <div v-else class="boss-container-empty">
      <div class="empty-content">
        <VIcon icon="mdi-account-question" size="64" color="#ccc" />
        <h3>캐릭터를 선택해주세요</h3>
        <p>보스 설정을 위해 먼저 캐릭터를 선택해주세요.</p>
        <VBtn
          color="primary"
          variant="outlined"
          @click="$emit('go-to-characters')"
        >
          캐릭터 관리로 이동
        </VBtn>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section.boss-container {
  ul.boss-list {
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    gap: 0px;

    li.boss-item {
      display: grid;
      grid-template-columns: 32px 80px 1fr 70px 120px;
      gap: 12px;
      justify-content: flex-start;
      align-items: center;
      padding: 1px 16px;
      border-radius: 8px;
      background: #f8f9fa;
      border: 1px solid transparent;
      transition: all 0.2s ease;

      &.selected {
        border-color: #667eea;
        background: rgba(103, 126, 234, 0.05);
      }

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      span.boss-item-name {
        font-size: 15px;
        font-weight: 600;
        color: #2c3e50;
      }

      .boss-price {
        padding: 4px 8px;
        border-radius: 6px;
        width: fit-content;
        margin-left: auto;
      }

      &.has-selected-difficulty .boss-price {
        background: rgba(103, 126, 234, 0.1);
      }
    }

    li.boss-total-price {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      border-top: 2px solid #e9ecef;
      padding: 16px 16px 0;
      margin-top: 16px;

      :deep(.boss-price-display) {
        padding: 8px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(103, 126, 234, 0.3);
      }
    }
  }

  div.selected-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 12px;
    background: rgba(103, 126, 234, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(103, 126, 234, 0.2);

    .character-name {
      font-size: 14px;
      font-weight: 600;
      color: #2c3e50;
    }

    .boss-count {
      font-size: 13px;
      color: #667eea;
      font-weight: 500;
    }
  }

  div.boss-container-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;

    .empty-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      text-align: center;

      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0;
      }

      p {
        font-size: 14px;
        color: #7f8c8d;
        margin: 0;
      }
    }
  }
}
</style>
