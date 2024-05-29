<template>
  <TransitionChild
    v-if="props.child"
    :enter="classes.enter"
    :enter-from="classes.enterFrom"
    :enter-to="classes.enterTo"
    :entered="classes.entered"
    :leave="classes.leave"
    :leave-from="classes.leaveFrom"
    :leave-to="classes.leaveTo"
  >
    <slot />
  </TransitionChild>
  <TransitionGroup
    v-else-if="props.group"
    :enter-active-class="classes.enter"
    :enter-from-class="classes.enterFrom"
    :enter-to-class="classes.enterTo"
    :leave-active-class="classes.leave"
    :leave-from-class="classes.leaveFrom"
    :leave-to-class="classes.leaveTo"
    :move-class="classes.move"
  >
    <slot />
  </TransitionGroup>
  <TransitionRoot
    v-else
    :show="props.show"
    :enter="classes.enter"
    :enter-from="classes.enterFrom"
    :enter-to="classes.enterTo"
    :entered="classes.entered"
    :leave="classes.leave"
    :leave-from="classes.leaveFrom"
    :leave-to="classes.leaveTo"
  >
    <slot />
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionChild, TransitionRoot } from "@headlessui/vue";

export type AnimationClasses = {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  entered?: string;
  move?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
};

export type Animation = "slide-from-top" | "slide-from-bottom-fade-out" | "none";
const animations: Record<Animation, AnimationClasses> = {
  "slide-from-top": {
    enter: "transition-[transform,opacity] duration-100",
    enterFrom: "opacity-0 -translate-y-2",
    enterTo: "opacity-100 translate-y-0",
    leave: "transition-[transform,opacity] duration-100",
    leaveFrom: "opacity-100 translate-y-0",
    leaveTo: "opacity-0 -translate-y-2",
  },
  "slide-from-bottom-fade-out": {
    enter: "transition-[transform,opacity] duration-200",
    enterFrom: "opacity-0 translate-y-8",
    enterTo: "opacity-100 translate-y-0",
    leave: "transition-[transform,opacity] origin-center duration-200",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-90",
    move: "transition-all duration-200"
  },
  none: {},
};

const props = defineProps<{
  child?: boolean;
  group?: boolean;
  show?: boolean;
  animation: Animation;
}>();

const classes = computed(() => animations[props.animation]);
</script>
