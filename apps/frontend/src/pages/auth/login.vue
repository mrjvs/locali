<template>
  <Center>
    <Card padding="md" class="w-[400px] max-w-full">
      <Logo class="text-2xl" />
      <Heading class="mb-8 mt-2">Login into Locali</Heading>
      <p>Login here!</p>
    </Card>
    <Footer />
  </Center>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'noauth',
})
</script>
