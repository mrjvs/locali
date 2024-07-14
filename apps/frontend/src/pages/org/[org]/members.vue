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
          v-for="user in (searchReq.data.value ?? [])"
          :key="user.id"
          type="button"
          :class="{
            'p-2 flex justify-between items-center rounded-md hover:bg-cardShade transition duration-100': true,
            'bg-primary text-primaryContrast hover:bg-primary': user.id === selectedUser,
          }"
          @click="selectedUser = user.id"
        >
          <User
            :inverted="user.id === selectedUser"
            :user="{ name: user.name, email: user.email }"
          />
          <Icon
            v-if="user.id === selectedUser"
            class="mx-2"
            name="mingcute:check-fill"
          />
        </button>
        <p v-if="searchReq.pending.value">Loading...</p>
      </div>

      <h1>Hi {{ searchInput }}</h1>

      <div class="flex flex-col space-y-2">
        <Label>Roles</Label>
        <button :class="{'py-3 px-4 border-inputBorder border transition duration-100 rounded-xl flex gap-3 text-sm text-left': true, 'border-primary': selectedRole === role}" v-for="role in Object.keys(orgRoles) as RoleType[]" @click="selectedRole === role ? selectedRole = '' : selectedRole = role">
          <Icon :name="orgRoles[role].icon" class="mt-1 text-xl" :class="{
              '!text-primary': selectedRole === role,
            }" />
          <div class="flex-1">
            <Label class="!mb-0" :class="{
              '!text-primary': selectedRole === role,
            }">{{ orgRoles[role].title }}</Label>
            <div>{{ orgRoles[role].body }}</div>
          </div>
        </button>
      </div>
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
import { searchUsers } from "~/services/api/users";

const searchInput = ref("");
const selectedUser = ref<string | null>(null);
type RoleType = "viewer" | "translator" | "admin";
const selectedRole = ref<"" | RoleType>("");

const orgRoles = {
  "viewer": {
    icon: "mingcute:eye-2-fill",
    title: "Viewer",
    body: "View all."
  },
  "translator": {
    icon: "mingcute:translate-2-line",
    title: "Translator",
    body: "Translate all."
  },
  "admin": {
    icon: "mingcute:hat-fill",
    title: "Admin",
    body: "Do all."
  },
} satisfies Record<RoleType, {icon: string, title: string, body: string}>;

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

watch([searchInput], () => {
  searchReq.execute(searchInput.value);
})
const searchReq = useAction({
  async action(keyword: string) {
    return await searchUsers(keyword);
  },
});
</script>
