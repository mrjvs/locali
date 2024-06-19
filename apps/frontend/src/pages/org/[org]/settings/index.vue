<template>
  <ThemeOverlap no-overlap>
    <template #top>
      <OrgTopNav v-if="req.data.value" :org="req.data.value" />
      <Container>
        <OrgSettingsContext v-if="req.data.value" :name="req.data.value.name" />
      </Container>
    </template>

    <Container>
      <AsideLayout>
        <template #aside>
          <Sidebar>
            <SidebarCategory name="Settings">
              <SidebarLink icon="mingcute:settings-4-fill" :to="`/org/${route.params.org}/settings`" exact>General</SidebarLink>
              <SidebarLink icon="mingcute:settings-4-fill" :to="`/org/${route.params.org}/settings/management`">Management</SidebarLink>
              <SidebarLink icon="mingcute:settings-4-fill" :to="`/org/${route.params.org}/settings/export`">Data export</SidebarLink>
            </SidebarCategory>
          </Sidebar>
        </template>

        <SectionHeading title="General settings" description="Change the most common settings of an organisation" />
      </AsideLayout>
    </Container>
  </ThemeOverlap>
</template>

<script setup lang="ts">
import { getOrg } from '~/services/api/org';

const route = useRoute();
const req = useImmediateAction({
  async action() {
    return getOrg(route.params.org.toString());
  },
})
</script>
