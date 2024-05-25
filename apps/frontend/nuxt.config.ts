export default defineNuxtConfig({
  srcDir: './src',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-svgo"
  ],
  runtimeConfig: {
    public: {
      docsUrl: 'http://google.com',
      aboutUrl: 'http://google.com',
      apiBaseUrl: "http://localhost:8080"
    }
  },
  components: {
    dirs: [{ path: '~/components', pathPrefix: false }]
  },
  googleFonts: {
    families: {
      'Source Sans 3': {
        wght: [400, 600],
      },
      'Manrope': {
        wght: [800],
      },
    }
  },
  svgo: {
    autoImportPath: '~/assets/icons',
    componentPrefix: 'icon',
  }
})
