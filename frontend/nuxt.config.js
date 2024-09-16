export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/services'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  '@nuxtjs/axios',
    '@nuxtjs/strapi'
  ],

  publicRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  privateRuntimeConfig: {
    // Add any private configs here (server-side only)
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337'
  },
  axios: {
    baseURL: process.env.STRAPI_URL || 'http://localhost:1337'
  }
}
