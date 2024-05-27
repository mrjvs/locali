<template>
  <div class="min-h-7 flex">
    <LclTransition :show="showing" animation="slide-from-top">
      <p class="text-error flex text-sm items-center font-bold mt-1.5">
        <IconAlert class="mr-2 ml-1" />
        <FormErrorBase :error="lastSeenError" />
      </p>
    </LclTransition>
  </div>
</template>

<script setup lang="ts">
import { type FormError } from '~/composables/formCreator';

const lastSeenError = ref<FormError | null>(null);

const props = defineProps<{
  error?: FormError | null;
}>();

const showing = computed(() => !!props.error)

watch([props], () => {
  if (props.error) lastSeenError.value = props.error;
}, {immediate: true})
</script>
