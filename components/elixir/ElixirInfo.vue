<script setup lang="ts">
import { useLevelStore } from '~/store';
import type { ElixirInfo } from '~/type/elixir';
const level = useLevelStore();
const props = defineProps({
  elixirInfo: {
    type: Object as PropType<ElixirInfo>,
    required: true,
  },
});
function click() {
  if (props.elixirInfo.disabled) return;
  props.elixirInfo.valueCount = +props.elixirInfo.valueCount + 1;
}
</script>

<template>
  <li
    class="elixir-info"
    :class="{ disabled: elixirInfo.disabled }"
    @click="click"
  >
    <div class="elixir-image">
      <ImageAssets type="elixir" :number="elixirInfo.key" />
    </div>
    <div class="elixir-info-title">
      <span class="elixir-name">{{ elixirInfo.elixir }}</span>
      <span class="elixir-count">- {{ elixirInfo.valueCount }}개</span>
    </div>
    <div class="elixir-info-exp">
      <span>사용시 경험치 : {{ makeComma(+elixirInfo.useExp) }}</span>
      <span class="exp-per">({{ elixirInfo.useExpPer }}%)</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
li.elixir-info {
  display: grid;
  grid-template-columns: 35px 1fr;
  grid-template-rows: 15px 15px;
  gap: 4px 8px;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  &:not(.disabled):hover {
    background-color: rgba(var(--v-theme-primary), 0.04);
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  .elixir-image {
    grid-row: 1/2 span;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 4px;
  }
  div.elixir-info-title,
  div.elixir-info-exp {
    display: flex;
    flex-direction: row;
    gap: 6px;
    span.elixir-name {
      font-size: 16px;
      font-weight: 500;
    }
    span.elixir-count {
      font-size: 14px;
      font-weight: 400;
    }
  }
  div.elixir-info-exp {
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
