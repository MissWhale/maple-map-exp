<script setup lang="ts">
type Type = 'area' | 'force' | 'Elixir';
const props = defineProps({
  type: {
    type: String as PropType<Type>,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    validator: (value: number, props: { type: Type }) => {
      if (props.type === 'area') {
        return value >= 0 && value < 19;
      } else if (props.type === 'force') {
        return value >= 0 && value < 2;
      } else {
        return value >= 0 && value < 7;
      }
    },
  },
});
const line = computed(() => {
  return props.type === 'area' ? 0 : props.type === 'force' ? 30 : 50;
});
const size = computed(() => {
  return props.type === 'force' ? 20 : 30;
});
const style = computed(() => {
  return {
    'background-position': `-${size.value * props.number}px -${line.value}px`,
    width: `${size.value}px`,
    height: `${size.value}px`,
  };
});
</script>

<template>
  <div class="image-assets" :style="style"></div>
</template>

<style scoped lang="scss">
div.image-assets {
  background: url('@/assets/img/sprite-image.png');
}
</style>
