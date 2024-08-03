// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from 'vite-plugin-vuetify'
import { viteConfig } from './viteСonfig'

export default defineNuxtConfig({
  compatibilityDate: '2024-07-31',
  devtools: { enabled: true },
  
  build: {
    transpile: ['vuetify'],
  },

  vite: viteConfig,

  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL
    }
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-svgo',
    '@pinia-plugin-persistedstate/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ]
})