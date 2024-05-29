<template>
  <Center>
    <Card padding="md" class="w-[400px] max-w-full">
      <FormProvider :form="form">
        <Logo class="text-2xl" />
        <Heading class="mb-8 mt-2">Login into Locali</Heading>
        <TextInput label="Email" v-model="form.data().email" :error="form.error('email')" placeholder="john@example.com" />
        <TextInput type="password" class="mb-8" label="Password" v-model="form.data().password" :error="form.error('password')" placeholder="Your password" />
        <div class="flex">
          <p class="flex-1 text-sm">
            Don't have an account yet?<br/>
            <ArrowLink to="/auth/signup">Create an account.</ArrowLink>
          </p>
          <Button size="wide" :pending="loginAction.pending.value" @click="loginAction.execute()">Log in</Button>
        </div>
      </FormProvider>
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
  showValidationToast: true,
  init: () => ({
    email: '',
    password: '',
  }),
  schema: z.object({
    email: z.string().min(1, 'Please enter your email').email('Please enter a valid email'),
    password: z.string().min(1, 'Please enter your password'),
  })
})

const loginAction = useAction({
  async action() {
    const res = form.validate();
    if (!res.success) return;
    if (res.data.password === "test") {
      form.errors.insert({
        formErrors: [{
          text: "Wrong password!",
        }]
      })
    }
    console.log("Logging in", res.data)
  },
});
</script>
