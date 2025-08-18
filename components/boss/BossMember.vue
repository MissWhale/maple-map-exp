<script setup lang="ts">
const props = defineProps<{
  member: number;
  bossId: number;
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: 'change', event: number): void;
}>();

const list = ref(Array.from({ length: 6 }, (_, i) => i + 1));
</script>

<template>
  <div class="boss-member">
    <VSelect
      :items="list"
      :model-value="props.member"
      :disabled="props.disabled"
      hide-details
      density="compact"
      @update:model-value="emit('change', $event)"
    />
  </div>
</template>
<style lang="scss">
div.boss-member {
  div.v-input {
    height: 32px;
    div.v-field {
      padding-right: 4px;
      div.v-field__input {
        padding: 6px 8px 6px 12px;
        min-height: 32px;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
</style>
<style scoped lang="scss">
div.boss-member {
}
</style>
