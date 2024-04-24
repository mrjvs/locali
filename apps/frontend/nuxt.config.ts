export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:8080"
    }
  }
})
