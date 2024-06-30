<template>
  <Container>
    <Heading class="mb-8 mt-2">Create project</Heading>
    <TextInput
      label="Project name"
      v-model="form.data().name"
      :error="form.error('name')"
      placeholder="Big project"
    />
    <TextInput
      label="Project description"
      v-model="form.data().description"
      :error="form.error('description')"
      placeholder="Big project"
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
import { createProject } from "~/services/api/project";
import { api } from "~/services/unwrap";
import { useAuthStore } from "~/store/auth";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = useForm({
  id: "createproject",
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

    const res = await api(createProject(route.params.org.toString(), data.data));
    if (res.error) {
      form.errors.insert(res.error.toFormError());
      return;
    }

    router.push(`/org/${route.params.org}/project/${res.data.id}`);
  },
});
</script>
