<template>
  <ThemeOverlap no-overlap>
    <template #top>
      <OrgTopNav v-if="req.data.value" :org="req.data.value.org" />
      <Container size="medium">
        <OrgSettingsContext v-if="req.data.value" :name="req.data.value.org.name" />
      </Container>
    </template>

    <SmallLayout>
      <Container size="medium">
        <SectionHeading title="Organisation members" description="Manage the members of the organisation">
          <template #right>
            <Button>Add people</Button>
          </template>
        </SectionHeading>
        <Table>
          <TableHeader>
            <TableTitle>Members</TableTitle>
          </TableHeader>
          <TableRow v-for="member in (req.data.value?.members.data ?? [])" :key="member.id">
            <div class="flex-1">
              <User :user="{ name: member.user.email, email: member.user.email }" />
            </div>
          </TableRow>
        </Table>
      </Container>
    </SmallLayout>
  </ThemeOverlap>
</template>

<script setup lang="ts">
import { getOrg, listOrgMembers } from '~/services/api/org';

const route = useRoute();
const req = useImmediateAction({
  async action() {
    return {
      org: await getOrg(route.params.org.toString()),
      members: await listOrgMembers(route.params.org.toString(), {
        limit: 30,
        offset: 0,
      })
    }
  },
})
</script>
