export default defineNuxtConfig({
  srcDir: './src',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-svgo",
    "nuxt-icon"
  ],
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
