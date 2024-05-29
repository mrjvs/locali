<template>
  <div>
    <Head>
      <Title>Locali</Title>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
      <Link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Html dir="ltr" />
    <ClientOnly>
      <slot />
      <ToastProvider />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import ToastProvider from "~/components/partials/toasts/ToastProvider.vue"
</script>
