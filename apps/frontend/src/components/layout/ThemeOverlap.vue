<template>
  <div>
    <div class="bg-primaryBg text-primaryBgSmallContrast relative">
      <slot name="top" />
      <div class="inset-x-0 bottom-0 absolute">
        <div class="bg-primaryBg absolute inset-x-0 top-0 h-[10rem]" />
      </div>
    </div>
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
