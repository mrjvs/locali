<template>
  <ThemeOverlap>
    <template #top>
      <OrgTopNav v-if="req.data.value" :org="req.data.value" />
    </template>

    <Container class="mt-[5rem] grid grid-cols-3 gap-4">
      <div v-if="projects.data.value" v-for="proj in projects.data.value.data" :key="proj.id" class="border p-3">
        <p>{{ proj.name }} ({{ proj.id }})</p>
        <NuxtLink :to="`/org/${route.params.org}/project/${proj.id}`">Show more</NuxtLink>
      </div>
    </Container>
  </ThemeOverlap>
</template>

<script setup lang="ts">
import { getOrg } from '~/services/api/org';
import { listProjects } from '~/services/api/project';

const route = useRoute();
const req = useImmediateAction({
  async action() {
    return getOrg(route.params.org.toString());
  },
})
const projects = useImmediateAction({
  async action() {
    return listProjects(route.params.org.toString(), {});
  },
})
</script>
