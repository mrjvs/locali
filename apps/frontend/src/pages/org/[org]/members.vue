<template>
  <ThemeOverlap no-overlap>
    <template #top>
      <OrgTopNav v-if="req.data.value" :org="req.data.value.org" />
      <Container size="medium">
        <OrgSettingsContext
          v-if="req.data.value"
          :name="req.data.value.org.name"
        />
      </Container>
    </template>

    <Modal
      :modal="inviteModal"
      :dismissable="true"
      title="Invite user to organisation"
    >
      <TextInput
        no-error
        v-model="searchInput"
        placeholder="Email or username"
        icon="mingcute:search-2-line"
      />

      <div
        class="mt-4 p-2 border shadow-input rounded-md space-y-1 flex flex-col overflow-y-auto h-96 border-inputBorder"
      >
        <button
          v-for="user in ['a', 'b', 'c']"
          :key="user"
          type="button"
          :class="{
            'p-2 flex justify-between items-center rounded-md hover:bg-cardShade transition duration-100': true,
            'bg-primary text-primaryContrast hover:bg-primary': user === selectedUser,
          }"
          @click="selectedUser = user"
        >
          <User
            :inverted="user === selectedUser"
            :user="{ name: user, email: user }"
          />
          <Icon
            v-if="user === selectedUser"
            class="mx-2"
            name="mingcute:check-fill"
          />
        </button>
      </div>

      <h1>Hi {{ searchInput }}</h1>
      <p>
        We have been trying to reach out to you for yiour's car extended
        extended warranty
      </p>
    </Modal>

    <SmallLayout>
      <Container size="medium">
        <SectionHeading
          title="Organisation members"
          description="Manage the members of the organisation"
        >
          <template #right>
            <Button @click="inviteModal.open()">Add people</Button>
          </template>
        </SectionHeading>
        <Table>
          <TableHeader>
            <TableTitle>Members</TableTitle>
          </TableHeader>
          <TableRow
            v-for="member in req.data.value?.members.data ?? []"
            :key="member.id"
          >
            <div class="flex-1">
              <User
                :user="{ name: member.user.email, email: member.user.email }"
              />
            </div>
          </TableRow>
        </Table>
      </Container>
    </SmallLayout>
  </ThemeOverlap>
</template>

<script setup lang="ts">
import { z } from "zod";
import TextInput from "~/components/ui/TextInput.vue";
import { getOrg, listOrgMembers } from "~/services/api/org";

const searchInput = ref("");
const selectedUser = ref<string | null>(null);

const inviteForm = useForm({
  id: "inviteform",
  init() {
    return {
      roles: [] as string[],
    };
  },
  schema: z.object({
    roles: z.array(z.string().min(1)),
  }),
});

const route = useRoute();
const inviteModal = useModal({
  onOpen() {
    inviteForm.reset();
  },
});

const req = useImmediateAction({
  async action() {
    return {
      org: await getOrg(route.params.org.toString()),
      members: await listOrgMembers(route.params.org.toString(), {
        limit: 30,
        offset: 0,
      }),
    };
  },
});
</script>
