<script setup lang="ts">
import { useBossStore, type UpdateCharacter } from '~/store';

const bossStore = useBossStore();
const search = ref<string | null>(null);
const searchLoading = ref(false);
const syncLoading = ref(false);
const syncDialog = ref(false);
async function handleSearch() {
  if (!search.value) return;
  searchLoading.value = true;
  try {
    const ocid = await getCharacterOCIDAPi(search.value);
    const characterInfo = await getCharacterDefaultInfoAPi(ocid.ocid);
    bossStore.addCharacter({
      name: characterInfo.character_name,
      class: characterInfo.character_class,
      image: characterInfo.character_image,
      level: characterInfo.character_level,
      world: characterInfo.world_name,
      isCleared: false,
      ocid: ocid.ocid,
    });
    search.value = null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Please input valid parameter') {
        alert('존재하지 않는 캐릭터입니다.');
      }
      if (error.message === 'Please input valid id') {
        alert('유효하지 않은 아이디입니다.');
      }
      return;
    }
    alert('오류가 발생했습니다.');
  } finally {
    searchLoading.value = false;
  }
}
async function handleRefresh() {
  syncLoading.value = true;
  syncDialog.value = true;
  try {
    const list: UpdateCharacter[] = [];
    for (const character of bossStore.characterList) {
      // ocid가 없으면 API로 가져옴
      const ocid =
        character.ocid ?? (await getCharacterOCIDAPi(character.name)).ocid;
      // ocid로 캐릭터 정보 조회
      const characterInfo = await getCharacterDefaultInfoAPi(ocid);
      // 결과 배열에 추가
      list.push({
        name: characterInfo.character_name,
        class: characterInfo.character_class,
        image: characterInfo.character_image,
        level: characterInfo.character_level,
        world: characterInfo.world_name,
      } as UpdateCharacter);
      // 0.5초 대기
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    bossStore.updateCharacterList(list);
  } catch (error) {
    console.error(error);
    alert('오류가 발생했습니다.');
  } finally {
    syncLoading.value = false;
    // 동기화 완료 후 1초 뒤에 다이얼로그 닫기
    setTimeout(() => {
      syncDialog.value = false;
    }, 1000);
  }
}
</script>

<template>
  <section class="character-container">
    <div class="card-header">
      <div class="header-content">
        <h2>캐릭터 관리</h2>
        <p>캐릭터를 추가하고 관리하세요</p>
      </div>
      <VBtn
        color="success"
        prepend-icon="mdi-refresh"
        @click="handleRefresh"
        :disabled="syncLoading"
      >
        정보 동기화
      </VBtn>
    </div>

    <div class="card-body">
      <div class="search-section">
        <VTextField
          v-model="search"
          placeholder="캐릭터명을 입력하세요"
          append-inner-icon="mdi-magnify"
          :loading="searchLoading"
          @click:append-inner="handleSearch"
          @keyup.enter="handleSearch"
          variant="outlined"
          density="compact"
        />
      </div>

      <client-only>
        <draggable
          v-model="bossStore.characterList"
          tag="transition-group"
          :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
          class="character-list"
          item-key="id"
          scroll
          ghost-class="ghost"
        >
          <template #item="{ element: item, index }">
            <li
              :class="{ selected: item.id === bossStore.selectCharacter }"
              @click="bossStore.selectCharacterChange(item.id)"
            >
              <div class="character-avatar">
                <VImg :src="item.image" />
                <div class="character-level">{{ item.level }}</div>
              </div>
              <div class="character-info">
                <div class="character-name">{{ item.name }}</div>
                <div class="character-class">{{ item.class }}</div>
              </div>
              <CharacterBossList :boss-list="item.boss" />
              <div class="character-actions">
                <VBtn
                  icon="mdi-delete"
                  variant="text"
                  color="error"
                  size="small"
                  @click.stop="bossStore.deleteCharacter(item.id)"
                />
              </div>
            </li>
          </template>
        </draggable>
      </client-only>
    </div>

    <!-- 동기화 로딩 오버레이 -->
    <VDialog
      v-model="syncDialog"
      persistent
      max-width="400"
      class="sync-dialog"
    >
      <VCard class="sync-card">
        <VCardText class="text-center pa-8">
          <VProgressCircular
            indeterminate
            color="success"
            size="64"
            width="6"
            class="mb-4"
          />
          <h3 class="text-h6 mb-2">정보 동기화 중...</h3>
          <p class="text-body-2 text-medium-emphasis">
            캐릭터 정보를 업데이트하고 있습니다.<br>
            잠시만 기다려주세요.
          </p>
        </VCardText>
      </VCard>
    </VDialog>
  </section>
</template>

<style scoped lang="scss">
.character-container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24px 24px 0 24px;
    margin-bottom: 20px;

    .header-content {
      h2 {
        font-size: 20px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 4px 0;
      }

      p {
        font-size: 14px;
        color: #7f8c8d;
        margin: 0;
      }
    }
  }

  .card-body {
    padding: 0 24px 24px 24px;

    .search-section {
      margin-bottom: 20px;
    }

    .character-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      li {
        display: grid;
        grid-template-columns: 60px 1fr auto 40px;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-radius: 12px;
        background: #f8f9fa;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          background: #e9ecef;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        &.selected {
          border-color: #667eea;
          background: rgba(103, 126, 234, 0.1);
        }

        .character-avatar {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

          .v-img {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 50%;
            
            :deep(img) {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
              transform: scale(3);
              margin-top: -10px;
              // margin-left: -5px;
            }
          }

          .character-level {
            position: absolute;
            bottom: -10px;
            left: calc(50% - 19px);
            background: #667eea;
            color: white;
            font-size: 12px;
            font-weight: 500;
            padding: 1px 6px 2px;
            border-radius: 6px;
            border: 2px solid #fff;
            width: 38px;
          }
        }

        .character-info {
          .character-name {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 4px;
          }

          .character-class {
            font-size: 14px;
            color: #7f8c8d;
          }
        }

        .character-actions {
          display: flex;
          justify-content: center;
        }
      }
    }
  }

  // 동기화 다이얼로그 스타일
  :deep(.sync-dialog) {
    .v-overlay__content {
      border-radius: 16px;
    }
  }

  .sync-card {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
}
</style>
