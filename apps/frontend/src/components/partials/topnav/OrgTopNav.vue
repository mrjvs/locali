<template>
  <TopNav>
    <template #left>
      <TopNavOrg :org="props.org" :project="props.project" />
    </template>
    <template #right>
      <TopNavPopulatedUser />
    </template>
  </TopNav>
</template>

<script setup lang="ts">
const props = defineProps<{
  org: {
    name: string;
    id: string;
  },
  project?: {
    name: string;
    id: string;
  }
}>();
</script>
