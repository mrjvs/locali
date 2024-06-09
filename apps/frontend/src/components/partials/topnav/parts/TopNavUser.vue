<template>
  <Menu v-slot="{ open }">
    <div class="relative">
      <MenuButton as="button" type="button" :class="{
        'flex items-center bg-primaryBgLighter bg-opacity-0 hover:bg-opacity-100 active:scale-105 hover:text-primaryContrast transition duration-100 py-1.5 px-3 rounded': true,
        '!bg-opacity-100 !text-primaryContrast': open,
      }">
        <div class="bg-primary rounded-full h-7 w-7 mr-2" />
        <p>{{ props.user.name }}</p>
        <Icon name="mingcute:down-small-fill" class="ml-1" />
      </MenuButton>

      <div class="absolute bottom-0 right-0">
        <div class="absolute top-2 right-0 w-56 z-50">
          <LclTransition animation="slide-from-top" :show="open">
            <MenuItems static>
              <Card padding="none" class="flex flex-col">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'text-primary' : 'text-text hover:text-primary',
                      'group flex items-center rounded-md m-1 px-2 py-1',
                    ]"
                    @click="logout"
                  >
                    Logout
                  </button>
                </MenuItem>
              </Card>
            </MenuItems>
          </LclTransition>
        </div>
      </div>
    </div>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/vue';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

const props = defineProps<{
  user: {
    name: string;
  }
}>();

function logout() {
  authStore.logout();
}
</script>
