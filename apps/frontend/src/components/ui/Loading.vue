<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
   width: 1em;
   height: 1em;
   --c: radial-gradient(farthest-side, currentColor 92%, rgba(0,0,0,0));
   background: var(--c) 50% 0,
          var(--c) 50% 100%,
          var(--c) 100% 50%,
          var(--c) 0    50%;
   background-size: 0.25em 0.25em;
   background-repeat: no-repeat;
   animation: spinner-anim 1s infinite;
   animation-delay: -0.5s;
}

@keyframes spinner-anim {
  to {
    transform: rotate(.5turn);
  }
}
</style>
