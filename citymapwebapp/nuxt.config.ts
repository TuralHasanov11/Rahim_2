// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'nuxt-security'
  ],

  runtimeConfig: {
    public: {
      mapboxAccessToken: ""
    }
  },

  security:{
    corsHandler: {
      origin: "https://hasanovtural12.retool.com"
    },
    headers: {
      contentSecurityPolicy: {
        'frame-ancestors': "https://hasanovtural12.retool.com"
      },
    },
  }
})