<script setup lang="ts">
import { useBossStore } from './store';

const bossStore = useBossStore();
const activeTab = ref(0);

const tabs = [
  { title: '캐릭터 관리', icon: 'mdi-account-group' },
  { title: '보스 설정', icon: 'mdi-sword-cross' },
  { title: '클리어 현황', icon: 'mdi-chart-line' },
];

// 전체 통계 정보
const totalStats = computed(() => ({
  totalCharacters: bossStore.totalCharacterList.length,
  clearedCharacters: bossStore.totalCharacterList.filter((c) => c.cleared)
    .length,
  totalPrice: transformKoreanBossReward(bossStore.totalPrice),
  clearedPrice: transformKoreanBossReward(bossStore.bossClearedPrice),
}));

// 캐릭터 선택 시 보스 설정 탭으로 자동 이동
watch(
  () => bossStore.selectCharacter,
  (newCharacterId) => {
    if (newCharacterId && activeTab.value !== 1) {
      activeTab.value = 1;
    }
  },
);
</script>

<template>
  <VApp>
    <main class="app-container">
      <!-- 상단 헤더 -->
      <header class="app-header">
        <div class="header-title">
          <h1>메이플 보스 클리어 관리</h1>
          <p class="header-subtitle">캐릭터별 보스 클리어 현황을 관리하세요</p>
        </div>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-label">캐릭터</span>
            <span class="stat-value"
              >{{ totalStats.clearedCharacters }}/{{
                totalStats.totalCharacters
              }}</span
            >
          </div>
          <div class="stat-item">
            <span class="stat-label">총 클리어</span>
            <span class="stat-value">{{ totalStats.clearedPrice }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">총 가격</span>
            <span class="stat-value">{{ totalStats.totalPrice }}</span>
          </div>
        </div>
      </header>

      <!-- 탭 네비게이션 -->
      <nav class="tab-navigation">
        <VBtn
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          variant="text"
          @click="activeTab = index"
        >
          <VIcon :icon="tab.icon" size="20" />
          <p>{{ tab.title }}</p>
        </VBtn>
      </nav>

      <!-- 탭 컨텐츠 -->
      <div class="tab-content">
        <Transition
          name="tab-slide"
          mode="out-in"
          :duration="{ enter: 300, leave: 300 }"
        >
          <!-- 캐릭터 관리 탭 -->
          <div v-if="activeTab === 0" key="characters" class="tab-panel">
            <div class="panel-grid">
              <div class="panel-card character-panel">
                <CharacterContainer />
              </div>
            </div>
          </div>

          <!-- 보스 설정 탭 -->
          <div v-else-if="activeTab === 1" key="boss" class="tab-panel">
            <div class="panel-grid">
              <div class="panel-card boss-panel">
                <BossContainer
                  :id="bossStore.selectCharacter"
                  @go-to-characters="activeTab = 0"
                />
              </div>
            </div>
          </div>

          <!-- 클리어 현황 탭 -->
          <div v-else-if="activeTab === 2" key="statistics" class="tab-panel">
            <div class="panel-grid">
              <div class="panel-card statistics-panel">
                <CharacterStatisticsContainer />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </main>
  </VApp>
</template>

<style lang="scss">
.app-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 0;
}

.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 24px 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);

  .header-title {
    margin-bottom: 16px;

    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
      margin: 0 0 4px 0;
    }

    .header-subtitle {
      font-size: 14px;
      color: #7f8c8d;
      margin: 0;
    }
  }

  .header-stats {
    display: flex;
    gap: 32px;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .stat-label {
        font-size: 12px;
        color: #7f8c8d;
        margin-bottom: 4px;
      }

      .stat-value {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
      }
    }
  }
}

.tab-navigation {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 0 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 8px;

  .v-btn {
    padding: 16px 24px;
    border-radius: 8px 8px 0 0;
    color: #7f8c8d;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    height: 60px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.15s;
    }

    &:hover {
      background: rgba(103, 126, 234, 0.1);
      color: #667eea;
      transform: translateY(-1px);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0);
    }

    &.active {
      background: #667eea;
      color: white;
      box-shadow: 0 2px 8px rgba(103, 126, 234, 0.3);
      transform: translateY(-2px);
    }

    span {
      margin-left: 8px;
      font-weight: 500;
    }
  }
}

.tab-content {
  padding: 32px;
  min-height: calc(100vh - 200px);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
}

.tab-panel {
  .panel-grid {
    display: grid;
    gap: 24px;
    max-width: 1200px;
    width: fit-content;
    margin: 0 auto;
  }

  .panel-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    // border: 1px solid rgba(255, 255, 255, 0.3);
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .app-header {
    padding: 16px 20px;

    .header-title h1 {
      font-size: 24px;
    }

    .header-stats {
      gap: 16px;

      .stat-item .stat-value {
        font-size: 16px;
      }
    }
  }

  .tab-navigation {
    padding: 0 20px;

    .v-btn {
      padding: 12px 16px;
      span {
        margin-left: 0;
        font-size: 12px;
      }
      p {
        display: none;
      }
    }
  }

  .tab-content {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .app-header .header-stats {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}

/* 탭 전환 애니메이션 */
.tab-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
  left: 0;
  top: 32px;
}

.tab-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
  left: 0;
  top: 32px;
}

.tab-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.tab-slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.tab-slide-enter-to,
.tab-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
