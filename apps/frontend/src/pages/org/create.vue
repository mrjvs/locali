<template>
  <Container>
    <Heading class="mb-8 mt-2">Create organisation</Heading>
    <TextInput
      label="Organisation name"
      v-model="form.data().name"
      :error="form.error('name')"
      placeholder="John's org"
    />
    <TextInput
      label="Organisation description"
      v-model="form.data().description"
      :error="form.error('description')"
      placeholder="John's org"
    />
    <Button
      :pending="createAction.pending.value"
      @click="createAction.execute()"
    >
      Create
    </Button>
  </Container>
</template>

<script setup lang="ts">
import { z } from "zod";
import { api } from "~/services/unwrap";
import { useAuthStore } from "~/store/auth";
import { createOrg } from "~/services/api/org";

const auth = useAuthStore();
const router = useRouter();

const form = useForm({
  id: "createorg",
  init: () => ({
    name: "",
    description: "",
  }),
  schema: z.object({
    name: z.string().min(1, "Please enter a name"),
    description: z.string().nullable(),
  }),
});

const createAction = useAction({
  async action() {
    const data = form.validate();
    if (!data.success) return;

    const res = await api(createOrg(data.data));
    if (res.error) {
      form.errors.insert(res.error.toFormError());
      return;
    }

    router.push(`/org/${res.data.id}`);
  },
});
</script>
