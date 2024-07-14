<template>
  <Center>
    <Card padding="md" class="w-[400px] max-w-full">
      <FormProvider :form="form">
        <Logo class="text-2xl" />
        <Heading class="mb-8 mt-2">Sign up a Locali account</Heading>
        <TextInput
          label="Email"
          v-model="form.data().email"
          :error="form.error('email')"
          placeholder="john@example.com"
        />
        <TextInput
          type="password"
          label="Password"
          v-model="form.data().password"
          :error="form.error('password')"
          placeholder="Your password"
        />
        <TextInput
          type="password"
          class="mb-8"
          label="Confirm password"
          v-model="form.data().passwordConfirm"
          :error="form.error('passwordConfirm')"
          placeholder="Your password"
        />
        <div class="flex">
          <p class="flex-1 text-sm">
            Already have an account?<br />
            <ArrowLink to="/auth/login">Go to login.</ArrowLink>
          </p>
          <Button
            size="wide"
            :pending="createAction.pending.value"
            @click="createAction.execute()"
            >Sign up</Button
          >
        </div>
      </FormProvider>
    </Card>
    <Footer />
  </Center>
</template>

<script setup lang="ts">
import { z } from "zod";
import { createAccount } from "~/services/api/auth";
import { api } from "~/services/unwrap";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "noauth",
});

const auth = useAuthStore();
const router = useRouter();

const form = useForm({
  id: "signup",
  showValidationToast: true,
  init: () => ({
    email: "",
    password: "",
    passwordConfirm: "",
  }),
  schema: z.object({
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string().min(1, "Please enter your password"),
  }),
});

const createAction = useAction({
  async action() {
    const data = form.validate();
    if (!data.success) return;
    if (data.data.password !== data.data.passwordConfirm) {
      form.errors.insert({
        validationErrors: [{
          id: 'passwordConfirm',
          text: 'Doesn\'t match above password'
        }]
      });
      return;
    }

    const res = await api(createAccount(data.data));
    if (res.error) {
      form.errors.insert(res.error.toFormError());
      return;
    }

    auth.setToken(res.data.token);
    await auth.retrieve();
    router.push("/");
  },
});
</script>
