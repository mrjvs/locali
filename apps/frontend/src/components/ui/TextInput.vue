<template>
  <label class="block my-2">
    <Label v-if="props.label">{{ props.label }}</Label>
    <div :class="{
      'w-full border rounded-md relative flex focus:outline-none focus:border-primary overflow-hidden shadow-input border-inputBorder transition-colors text-bold': true,
      '!border-error': !!props.error,
    }">
      <div v-if="props.icon" class="text-lg absolute text-text pointer-events-none flex items-center inset-y-0 px-3">
        <Icon :name="props.icon" />
      </div>
      <input :type="props.type ?? 'text'" class="flex-1 px-4 py-1.5 focus:outline-none" :class="{
        '!pl-9': !!props.icon
      }" v-model="text" :placeholder="props.placeholder"  />
    </div>
    <FormError v-if="!props.noError" :error="props.error" />
  </label>
</template>

<script setup lang="ts">
import type { FormError } from '~/composables/formCreator';

const text = defineModel();
const props = defineProps<{
  label?: string;
  icon?: string;
  placeholder?: string;
  type?: 'text' | "password",
  error?: FormError | null,
  noError?: boolean;
}>();

watch([text], () => {
  props.error?.clear();
});
</script>
