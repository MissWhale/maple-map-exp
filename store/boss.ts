import { nanoid } from 'nanoid';
export interface Character {
  id: string;
  class: string;
  image: string;
  level: number;
  name: string;
  world: string;
  isCleared: boolean;
  ocid: string | null;
}
export interface UpdateCharacter extends Omit<Character, 'isCleared' | 'id'> {}
export interface NewCharacter extends Omit<Character, 'id'> {}
export interface CharacterBoss {
  id: number;
  difficulty: BossDifficultyNumber | null;
  member: number;
}
export interface CharacterTotalInfo extends Character {
  boss: CharacterBoss[];
}
export const useBossStore = defineStore(
  'boss',
  () => {
    const characterList = ref<CharacterTotalInfo[]>([]);
    const selectCharacter = ref<string | null>(null);
    const totalCharacterList = computed(() => {
      return characterList.value.map((character) => {
        const bossMap = new Map(bossList.map((boss) => [boss.id, boss]));
        return {
          id: character.id,
          name: character.name,
          count: character.boss.length,
          cleared: character.isCleared,
          price: character.boss.reduce((acc, boss) => {
            const bossInfo = bossMap.get(boss.id);
            return (
              acc +
              (bossInfo && boss.difficulty !== null
                ? Math.floor(
                    bossInfo.rewardByDifficulty[boss.difficulty] / boss.member,
                  )
                : 0)
            );
          }, 0),
          updateCleared: () => {
            updateCharacterCleared(character.id);
          },
        };
      });
    });
    const totalPrice = computed(() => {
      const bossMap = new Map(bossList.map((boss) => [boss.id, boss]));
      return characterList.value
        .flatMap((character) => character.boss)
        .reduce((acc, boss) => {
          const bossInfo = bossMap.get(boss.id);
          return (
            acc +
            (bossInfo && boss.difficulty !== null
              ? Math.floor(
                  bossInfo.rewardByDifficulty[boss.difficulty] / boss.member,
                )
              : 0)
          );
        }, 0);
    });
    const totalBossLength = computed(() => {
      return characterList.value.reduce((acc, character) => {
        return acc + character.boss.length;
      }, 0);
    });
    const bossClearedPrice = computed(() => {
      const bossMap = new Map(bossList.map((boss) => [boss.id, boss]));
      return characterList.value
        .filter((character) => character.isCleared)
        .flatMap((character) => character.boss)
        .reduce((acc, boss) => {
          const bossInfo = bossMap.get(boss.id);
          return (
            acc +
            (bossInfo && boss.difficulty !== null
              ? Math.floor(
                  bossInfo.rewardByDifficulty[boss.difficulty] / boss.member,
                )
              : 0)
          );
        }, 0);
    });
    const bossClearedCount = computed(() => {
      return characterList.value
        .filter((character) => character.isCleared)
        .reduce((acc, character) => {
          return acc + character.boss.length;
        }, 0);
    });
    const notClearedPrice = computed(() => {
      return totalPrice.value - bossClearedPrice.value;
    });

    function selectCharacterChange(id: string | null) {
      if (id === selectCharacter.value) {
        selectCharacter.value = null;
      } else {
        selectCharacter.value = id;
      }
    }

    function isExistCharacter(characterName: string) {
      return characterList.value.some(
        (character) => character.name === characterName,
      );
    }
    function addCharacter(character: NewCharacter) {
      if (isExistCharacter(character.name)) {
        alert('이미 존재하는 캐릭터입니다.');
        return;
      }
      const id = nanoid();
      characterList.value.push({
        ...character,
        id,
        boss: [],
      });
      selectCharacter.value = id;
    }
    function deleteCharacter(id: string) {
      characterList.value = characterList.value.filter(
        (character) => character.id !== id,
      );
    }
    function updateCharacterBoss(
      bossId: number,
      difficulty: BossDifficultyNumber | null,
    ) {
      const character = characterList.value.find(
        (character) => character.id === selectCharacter.value,
      );
      if (character) {
        const findBoss = character.boss.find((b) => b.id === bossId);
        if (findBoss) {
          if (findBoss.difficulty === difficulty) {
            const index = character.boss.findIndex((b) => b.id === bossId);
            character.boss.splice(index, 1);
            return;
          } else {
            findBoss.difficulty = difficulty;
            return;
          }
        } else {
          character.boss.push({ id: bossId, difficulty, member: 1 });
        }
      }
    }
    function updateCharacterBossMember(bossId: number, member: number) {
      const character = characterList.value.find(
        (character) => character.id === selectCharacter.value,
      );
      if (character) {
        const findBoss = character.boss.find((b) => b.id === bossId);
        if (findBoss) {
          findBoss.member = member;
        }
      }
    }
    function changeAllCharacterCleared(cleared: boolean) {
      characterList.value.forEach((character) => {
        character.isCleared = cleared;
      });
    }
    function updateCharacterCleared(id: string) {
      const character = characterList.value.find(
        (character) => character.id === id,
      );
      if (character) {
        character.isCleared = !character.isCleared;
      }
    }
    function updateCharacterList(list: UpdateCharacter[]) {
      characterList.value = characterList.value.map((character) => {
        const findCharacter = list.find((c) => c.name === character.name);
        if (findCharacter) {
          return {
            ...character,
            ...findCharacter,
          };
        } else {
          return character;
        }
      });
    }
    onMounted(() => {
      selectCharacter.value = null;
    });
    return {
      characterList,
      selectCharacter,
      totalCharacterList,
      selectCharacterChange,
      addCharacter,
      isExistCharacter,
      deleteCharacter,
      updateCharacterBoss,
      updateCharacterBossMember,
      totalPrice,
      bossClearedPrice,
      notClearedPrice,
      totalBossLength,
      bossClearedCount,
      changeAllCharacterCleared,
      updateCharacterList,
    };
  },
  {
    persist: [
      {
        storage: persistedState.localStorage,
      },
    ],
  },
);
