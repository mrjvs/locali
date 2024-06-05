<template>
  <div>
    <p>This page is empty, not sure what to put here yet.</p>
    <hr />
    <div v-if="org.data.value" v-for="org in org.data.value.data" :key="org.id" class="border p-3">
      <p>{{ org.name }} ({{ org.id }})</p>
      <NuxtLink :to="`/org/${org.id}`">Show more</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { listOrgs } from '~/services/api/org';

const org = useImmediateAction({
  async action() {
    return listOrgs({});
  },
})
</script>
