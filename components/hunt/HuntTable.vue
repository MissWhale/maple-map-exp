<script setup lang="ts">
import { useHuntStore } from '~/store/hunt';
const emit = defineEmits(['addClick']);
const HEADERS = [
  { text: '맵', value: 'map' },
  { text: '경험치', value: 'exp' },
  { text: '퍼센트', value: 'percent' },
];
const huntStore = useHuntStore();
function addClick() {
  emit('addClick');
}
</script>

<template>
  <section class="hunt-table-section">
    <table class="hunt-table">
      <thead>
        <tr>
          <th
            v-for="header in HEADERS"
            :key="header.value"
            :class="header.value"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <HuntList
          v-for="hunt in huntStore.huntList"
          :key="hunt.id"
          :info="hunt"
        />
        <tr>
          <td colspan="3">
            <div class="hunt-table-add">
              <VBtn color="primary" @click="addClick">추가</VBtn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
section.hunt-table-section {
  table.hunt-table {
    width: 100%;
    div.hunt-table-add {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
