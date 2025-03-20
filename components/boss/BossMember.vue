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
    height: 24px;
    div.v-field {
      padding-right: 2px;
      div.v-field__input {
        padding: 4px 6px 4px 12px;
        min-height: 24px;
      }
    }
  }
}
</style>
<style scoped lang="scss">
div.boss-member {
}
</style>
