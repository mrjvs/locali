<template>
  <ThemeOverlap no-overlap>
    <template #top>
      <OrgTopNav v-if="req.data.value" :org="req.data.value" />
      <Container size="small">
        <OrgHeader v-if="req.data.value" :org="req.data.value" />
      </Container>
    </template>

    <Container size="small">
      <Heading class="mb-4 mt-12">Project</Heading>
      <div class="grid gap-4">
        <NuxtLink :to="`/org/${route.params.org}/project/${proj.id}`" v-if="projects.data.value" v-for="proj in projects.data.value.data" :key="proj.id">
          <Card class="flex items-center">
            <div class="flex-1">
              <Heading size="text">{{ proj.name }}</Heading>
              <p>{{ proj.description }}</p>
              <p>{{ proj.id }}</p>
            </div>
            <p>0%</p>
          </Card>
        </NuxtLink>
      </div>
      <Button :to="`/org/${route.params.org}/project/create`">Create project</Button>
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
