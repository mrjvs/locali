<template>
  <div class="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center my-8 text-sm justify-center">
    <a :href="config.aboutUrl" class="hover:text-bold active:opacity-50 transition-colors duration-100" target="_blank">
      Powered by <Logo class="text-xs ml-2" text />
    </a>
    <Seperator class="hidden sm:inline-block" />
    <a :href="config.aboutUrl" class="hover:text-bold active:opacity-50 transition-colors duration-100" target="_blank">
      About Locali
    </a>
    <Seperator class="hidden sm:inline-block" />
    <a :href="config.docsUrl" class="hover:text-bold active:opacity-50 transition-colors duration-100" target="_blank">
      Documentation
    </a>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig().public;
</script>
