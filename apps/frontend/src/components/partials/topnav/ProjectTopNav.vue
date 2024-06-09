<template>
  <TopNav>
    <template #left>
      <TopNavOrg :org="props.org" :project="props.project" />
    </template>
    <template #right>
      <TopNavPopulatedUser />
    </template>
    <template #default>
      <TopNavItem :to="`/org/${props.org.id}/project/${props.project.id}`" exact>Translate</TopNavItem>
      <TopNavItem :to="`/org/${props.org.id}/project/${props.project.id}/submissions`">Submissions</TopNavItem>
      <TopNavItem :to="`/org/${props.org.id}/project/${props.project.id}/contributors`">Contributors</TopNavItem>
      <TopNavItem :to="`/org/${props.org.id}/project/${props.project.id}/stats`">Statistics</TopNavItem>
      <TopNavItem :to="`/org/${props.org.id}/project/${props.project.id}/settings`">Settings</TopNavItem>
    </template>
  </TopNav>
</template>

<script setup lang="ts">
const props = defineProps<{
  org: {
    name: string;
    id: string;
  },
  project: {
    name: string;
    id: string;
  }
}>();
</script>
