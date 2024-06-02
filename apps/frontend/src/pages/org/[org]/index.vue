<template>
  <ThemeOverlap>
    <template #top>
      <OrgTopNav />
    </template>

    <Container class="mt-[5rem] grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <Heading color="primary">Groups</Heading>
        <div class="mt-4 grid gap-4 grid-cols-2">
          <Card padding="sm">
            test
          </Card>
          <Card padding="sm">
            test
          </Card>
        </div>
      </div>
      <div>
        <Card padding="sm" type="primary" class="text-primaryBgSmallContrast">
          <Heading color="primary" size="sub">About the project</Heading>
          <p>All translations for the website.</p>
        </Card>
      </div>
    </Container>
  </ThemeOverlap>
</template>
