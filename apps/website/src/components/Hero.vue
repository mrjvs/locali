<template>
  <Container class="flex flex-col items-center text-center justify-center mt-36 mb-44">
    <Logo class="mb-4" />
    <h1 class="font-heading text-4xl w-[400px] mx-auto text-neutral-c800">
      Localisation without all of the hassle
    </h1>
    <p class="w-[400px] mx-auto text-lg mt-9 mb-12">Making large scale localization fun for both Developers and Translators</p>
    <div id="hero-form" class="flex hover:border-accent-c200 transition w-[400px] overflow-hidden shadow-sm mx-auto rounded-full bg-neutral-c50 border border-neutral-c300">
      <input v-model="email" class="flex-1 text-neutral-c800 focus:outline-none py-3 px-4" placeholder="Enter your email address" />
      <button @click="signup()" type="button" class="m-1.5 hover:to-accent-c400 active:scale-105 transition text-nowrap text-neutral-c50 rounded-full py-1.5 px-4 border border-accent-c200 text-center from-accent-c200 to-accent-c300 bg-gradient-to-b">
        {{ state.pending ? 'Submitting...' : 'Join waitlist' }}
      </button>
    </div>
    <div class="mt-2">
      <p v-if="state.error" class="font-bold text-red-600">Couldn't submit your email, try again later</p>
      <p v-if="state.success" class="text-accent-c200">Success, check your inbox to verify!</p>
    </div>
  </Container>
</template>

<script setup lang="ts">
const email = ref('');
const waitlist = 17962;
const state = reactive({
  pending: false,
  error: false,
  success: false,
})

async function signup() {
  if (state.pending) return;
  state.pending = true;
  state.error = false;
  state.success = false;
  try {
    const res = await fetch('https://api.getwaitlist.com/api/v1/signup', {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        waitlist_id: waitlist,
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
    if (res.status !== 200) throw new Error("Status code not OK");
    state.pending = false;
    state.error = false;
    state.success = true;
    return;
  } catch (err) {
    console.error(err);
    state.pending = false;
    state.error = true;
    return;
  }
}
</script>
