<template>
  <TopNav>
    <template #left>
      <TopNavOrg :org="{
        name: 'Org name',
        id: '123',
      }" :project="{
        name: 'Project name',
        id: '123',
      }" />
    </template>
    <template #right>
      <TopNavPopulatedUser />
    </template>
  </TopNav>
</template>
