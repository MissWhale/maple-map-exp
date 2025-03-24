<script setup lang="ts">
import { useBossStore } from '~/store';

const bossStore = useBossStore();
const search = ref<string | null>(null);
const searchLoading = ref(false);
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
</script>

<template>
  <section class="character-container card-container">
    <CommonCardHeader title="캐릭터 선택" />
    <div class="character-search">
      <VTextField
        v-model="search"
        placeholder="Search"
        append-inner-icon="mdi-magnify"
        :loading="searchLoading"
        @click:append-inner="handleSearch"
        @keyup.enter="handleSearch"
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
            <div class="character-image">
              <VImg :src="item.image" />
            </div>
            <div class="character-info">
              <div class="character-name">{{ item.name }}</div>
              <div class="character-class">{{ item.class }}</div>
              <div class="character-level">{{ item.level }}</div>
            </div>
            <CharacterBossList :boss-list="item.boss" />
            <div class="character-delete">
              <VIcon
                icon="mdi-delete"
                size="24px"
                color="error"
                @click="bossStore.deleteCharacter(item.id)"
              />
            </div>
          </li>
        </template>
      </draggable>
    </client-only>
  </section>
</template>

<style scoped lang="scss">
section.character-container {
  min-width: 300px;
  div.character-search {
    padding: 8px 0;
  }
  ul.character-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    li {
      display: grid;
      grid-template-columns: 48px 120px 1fr 24px;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      background-color: #fff;
      outline: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
      outline-offset: -2px;
      &:hover {
        background-color: #f0f0f0;
      }
      div.character-image {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #e0e0e0;
      }
      div.character-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        div.character-name {
          font-size: 14px;
          font-weight: 500;
        }
        div.character-class,
        div.character-level {
          font-size: 12px;
        }
      }
      &.flip-list-move {
        transition: transform 0.2s;
      }
      &.no-move {
        transition: transform 0s;
      }
      &.sortable-chosen {
        cursor: move;
      }
      &.ghost {
        opacity: 0.5;
        background: #c8ebfb;
      }
      &.selected {
        outline-width: 2px;
        outline-color: $primary;
      }
    }
  }
}
</style>
