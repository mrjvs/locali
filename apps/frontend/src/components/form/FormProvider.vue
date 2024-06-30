<template>
  <div :id="id"><slot /></div>
</template>

<script setup lang="ts">
import { FORM_PREFIX, type FormControls } from '~/composables/formCreator';

const props = defineProps<{
  form: FormControls<any>;
}>();

const id = computed(() => FORM_PREFIX + props.form.id);
</script>
