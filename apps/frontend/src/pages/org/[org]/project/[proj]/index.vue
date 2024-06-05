<template>
  <ThemeOverlap>
    <template #top>
      <OrgTopNav v-if="req.data.value" :org="req.data.value.org" :project="req.data.value.project" />
    </template>

    <Container class="mt-[5rem] grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <Heading color="primary">Groups</Heading>
        <div class="mt-4 grid gap-4 grid-cols-2">
          <Card padding="sm">
            test
          </Card>
          <Card padding="sm">
            test
          </Card>
        </div>
      </div>
      <div>
        <Card padding="none" type="primary" class="text-primaryBgSmallContrast">
          <div class="p-6">
            <Heading color="primary" size="sub" class="mb-2">About the project</Heading>
            <p class="mb-4">All translations for the website.</p>
            <Stat color="primary"><NuxtLink to="https://pretendo.network" target="_blank" class="text-primaryContrast underline hover:opacity-75">https://pretendo.network</NuxtLink></Stat>
            <Stat color="primary"><span class="text-primaryContrast">24</span> contributors</Stat>
            <Stat color="primary"><span class="text-primaryContrast">1254</span> strings</Stat>
          </div>
          <Divider type="primary" />
          <div class="p-6">
            <Heading color="primary" size="sub" class="mb-2">Let's get translating!</Heading>
            <p class="mb-4">This project is open for translation.</p>
            <Button type="primary" align="stretch">Start translating!</Button>
          </div>
        </Card>
      </div>
    </Container>
  </ThemeOverlap>
</template>

<script setup lang="ts">
import { getOrg } from '~/services/api/org';
import { getProject } from '~/services/api/project';

const route = useRoute();
const req = useImmediateAction({
  async action() {
    return {
      org: await getOrg(route.params.org.toString()),
      project: await getProject(route.params.proj.toString()),
    }
  },
})
</script>
