<script setup lang="ts">
import type { MonsterParkInput } from '~/type/monster-park';
import type { Option } from '@/type/doping/caculator-input';
defineProps<{
  input: MonsterParkInput;
}>();
</script>

<template>
  <tr class="monster-park-input">
    <td class="monster-park-select">
      <template v-if="input.inputType === 'select'">
        <VSelect
          v-model:model-value="input.value"
          :items="input.options as Array<Option>"
          :itemTitle="input.optionLabel"
          :itemValue="input.optionValue"
          :disabled="input.disabled as boolean"
          variant="outlined"
          clearable
          hideDetails
        />
      </template>
      <template v-else-if="input.inputType === 'switch'">
        <VSwitch
          v-model:model-value="input.value"
          color="primary"
          variant="outlined"
          hideDetails
          block
          inset
          :disabled="input.disabled as boolean"
          label="익스트림 몬스터파크"
        />
      </template>
    </td>
    <td class="monster-park-input-exp">
      {{ makeComma(+input.exp) }}
    </td>
    <td class="monster-park-input-exp-per">{{ input.expPer }}%</td>
  </tr>
</template>

<style scoped lang="scss">
@import './MonsterPark.scss';
</style>
