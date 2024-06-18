<template>
  <div>
    <Colors />
    <div class="h-1.5 bg-accent-c300" />
    <div class="relative">
      <Nav />
      <Hero />
      <Container>
        <div class="px-4 flex gap-4 flex-col sm:flex-row">
          <div class="flex-1 flex flex-col gap-4">
            <Card
              icon="mingcute:list-check-2-line"
              title="Validate translations with Locali Checks"
              bg-color-class="bg-[#2338A9]"
              icon-color-class="text-[#2338A9]"
            >
              Checks can validate anything. From syntax to missing comma's. Create &
              code your own checks using simple Javascript code.
            </Card>
            <Card
              icon="mingcute:github-fill"
              title="Synchronize with Git"
              bg-color-class="bg-[#A948D7]"
              icon-color-class="text-[#A948D7]"
            >
              Keep your translations synced with any git repository. Either push directly to the main branch or have automatic pull requests.
            </Card>
            <Card
              icon="mingcute:git-branch-fill"
              title="Fit any team size"
              bg-color-class="bg-[#E13065]"
              icon-color-class="text-[#E13065]"
            >
              Whether you are translating yourself, using a translation service or depending on crowd sourcing. Locali fits any size or workflow.
            </Card>
          </div>
          <div class="flex-1 flex flex-col gap-4">
            <Card
              class="sm:mt-28"
              icon="mingcute:git-branch-fill"
              title="Proudly open source"
              bg-color-class="bg-[#23A938]"
              icon-color-class="text-[#23A938]"
            >
              Source code is open to contribute and read. Self-hosting is encouraged.
            </Card>
            <Card
              icon="mingcute:git-branch-fill"
              title="Approval system"
              bg-color-class="bg-[#E13065]"
              icon-color-class="text-[#E13065]"
            >
              Sometimes translations can be unreliable. In that event, you can force users to submit translations for approvals. So you can review translations before they go through.
            </Card>
            <DarkCard
              title="Interested?"
            >
              Join the waitlist and get updates on progress on Locali while its being built. You may even get early access to the platform.
            </DarkCard>
          </div>
        </div>
      </Container>
      <p class="mt-40 mb-6 text-center">
        <span>Copyright Locali 2024</span>
        <span class="h-1 inline-block mb-1 w-1 mx-2 bg-neutral-c300 rounded-full" />
        <span>Made with passion</span>
      </p>
    </div>
  </div>
</template>
