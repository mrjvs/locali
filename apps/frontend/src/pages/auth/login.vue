<template>
  <Center>
    <Card padding="md" class="w-[400px] max-w-full">
      <Logo class="text-2xl" />
      <Heading class="mb-8 mt-2">Login into Locali</Heading>
      <TextInput label="Email" v-model="form.data().email" placeholder="john@example.com" />
      <TextInput type="password" label="Password" v-model="form.data().password" placeholder="Your password" />
      <Button align="stretch" :pending="loginAction.pending.value" @click="loginAction.execute()">Log in</Button>
    </Card>
    <Footer />
  </Center>
</template>

<script setup lang="ts">
import { z } from 'zod';

definePageMeta({
  layout: 'noauth',
})

const form = useForm({
  id: 'login',
  init: () => ({
    email: '',
    password: '',
  }),
  schema: z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  })
})

const loginAction = useAction({
  async action() {
    const res = form.validate();
    if (!res.success) return;
    console.log("Logging in", res.data)
  },
});
</script>
