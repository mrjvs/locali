<template>
  <ThemeOverlap no-overlap>
    <template #top>
      <OrgTopNav v-if="req.data.value" :org="req.data.value" />
      <Container size="medium">
        <OrgSettingsContext v-if="req.data.value" :name="req.data.value.name" />
      </Container>
    </template>

    <SmallLayout>
      <Container size="medium">
        <SectionHeading title="Organisation members" description="Manage the members of the organisation">
          <template #right>
            <Button>Add people</Button>
          </template>
        </SectionHeading>
      </Container>
    </SmallLayout>
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
