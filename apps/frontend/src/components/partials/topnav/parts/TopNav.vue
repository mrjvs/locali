<template>
  <Container>
    <div class="relative flex items-center py-6">
      <div class="flex-1">
        <slot name="left" />
      </div>
      <div class="flex items-center justify-end">
        <slot name="right" />
      </div>
      <div class="flex absolute inset-0 items-center pointer-events-none [&>*]:pointer-events-auto">
        <slot />
      </div>
    </div>
  </Container>
</template>
