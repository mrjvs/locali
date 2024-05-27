<template>
  <span v-if="id && text" :id="id">{{ text }}</span>
</template>

<script setup lang="ts">
import { FORM_PREFIX, type FormError } from '~/composables/formCreator';

const props = defineProps<{
  error?: FormError | null;
}>();

const id = computed(() => props.error ? FORM_PREFIX + props.error.id : null);
const text = computed(() => props.error?.text ?? null);
</script>
