<template>
  <TopNav>
    <template #left>
      <TopNavOrg :org="props.org" />
    </template>
    <template #right>
      <TopNavPopulatedUser />
    </template>
    <template #default>
      <TopNavItem :to="`/org/${props.org.id}`" exact>Projects</TopNavItem>
      <TopNavItem :to="`/org/${props.org.id}/members`">Members</TopNavItem>
      <TopNavItem :to="`/org/${props.org.id}/settings`">Settings</TopNavItem>
    </template>
  </TopNav>
</template>

<script setup lang="ts">
const props = defineProps<{
  org: {
    name: string;
    id: string;
  },
}>();
</script>
