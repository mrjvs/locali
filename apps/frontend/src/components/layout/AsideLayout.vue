<template>
  <div class="flex my-16">
    <div class="w-[200px] mr-8">
      <slot name="aside" />
    </div>
    <div class="flex flex-col">
      <slot />
    </div>
  </div>
</template>
