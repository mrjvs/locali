<template>
  <div class="flex text-sm items-center">
    <div
      class="bg-primary rounded-full h-9 w-9 mr-3"
      :class="{
        'outline-1 outline outline-cardStroke': props.inverted,
      }"
    />
    <div
      class="flex flex-col"
      :class="{
        'text-primaryContrast': props.inverted,
      }"
    >
      <p
        class="font-bold font-heading text-bold mb-0.5"
        :class="{
          'text-primaryContrast': props.inverted,
        }"
      >
        {{ props.user.name }}
      </p>
      <p v-if="props.user.email">{{ props.user.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: {
    name: string;
    email?: string;
  };
  inverted?: boolean;
}>();
</script>
