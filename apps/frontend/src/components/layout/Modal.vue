<template>
  <Teleport to="body">
    <Html v-if="showing" class="stop-scroll" />
    <LclTransition animation="fade" :show="showing">
      <Overlay @click="close" />
    </LclTransition>
    <LclTransition animation="fade" :show="showing">
      <div class="fixed z-50 flex pointer-events-none inset-0">
        <div class="fixed h-screen top-0 left-0 w-full overflow-x-hidden">
          <div class="flex min-h-full h-auto">
            <div class="m-auto max-w-full [&>*]:pointer-events-auto">
              <ModalSmallCard v-if="type === 'small'" :title="title" :dismissable="props.dismissable" v-on:close="" @close="close()">
                <slot />
              </ModalSmallCard>
              <div v-else-if="type === 'none'" class="relative"><slot /></div>
            </div>
          </div>
        </div>
      </div>
    </LclTransition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modal: ModalControls;
  type?: 'small' | 'none';
  dismissable?: boolean;
  title?: string;
}>();
const showing = computed(() => props.modal.state.value);
const type = computed(() => props.type ?? 'small');

function close() {
  if (props.dismissable) {
    props.modal.close();
  }
}
</script>
