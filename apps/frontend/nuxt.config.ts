export default defineNuxtConfig({
  srcDir: './src',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-svgo",
    "nuxt-icon"
  ],
  devServer: {
    port: 3000
  },
  runtimeConfig: {
    public: {
      docsUrl: 'https://github.com/mrjvs/locali',
      aboutUrl: 'https://github.com/mrjvs/locali',
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
