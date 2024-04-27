export default defineNuxtConfig({
  srcDir: './src',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:8080"
    }
  }
})
