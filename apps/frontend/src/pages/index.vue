<template>
  <div>
    <p>This page is empty, not sure what to put here yet.</p>
    <hr />
    <Heading>User orgs</Heading>
    <div v-if="user" v-for="member in user.orgMembers" :key="member.id" class="border p-3">
      <p>{{ member.org.name }} ({{ member.org.id }})</p>
      <NuxtLink :to="`/org/${member.org.id}`">Show more</NuxtLink>
    </div>
    <Heading>User projects</Heading>
    <div v-if="user" v-for="member in user.projectMembers" :key="member.id" class="border p-3">
      <p>{{ member.project.name }} ({{ member.project.id }})</p>
      <NuxtLink :to="`/org/${member.project.orgId}/project/${member.project.id}`">Show more</NuxtLink>
    </div>
    <Heading>Global orgs</Heading>
    <div v-if="org.data.value" v-for="org in org.data.value.data" :key="org.id" class="border p-3">
      <p>{{ org.name }} ({{ org.id }})</p>
      <NuxtLink :to="`/org/${org.id}`">Show more</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { listOrgs } from '~/services/api/org';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user?.user);

const org = useImmediateAction({
  async action() {
    return listOrgs({});
  },
})
</script>
