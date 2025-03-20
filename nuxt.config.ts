import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap',
        },
      ],
    },
  },

  ssr: false,
  devtools: { enabled: false },
  css: ['vuetify/styles'],

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'vuetify-nuxt-module',
    '@nuxthub/core',
  ],

  build: {
    transpile: ['vuetify'],
  },
  vuetify: {
    moduleOptions: {
      /* other module options */
      styles: { configFile: 'assets/variables/setting.scss' },
    },
    vuetifyOptions: {
      /* vuetify options */
      icons: {
        defaultSet: 'mdi',
      },
      theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#1a5bff',
              error: '#ff4757',
            },
          },
          dark: {
            dark: true,
            colors: {
              primary: '#1a5bff',
              error: '#ff4757',
            },
          },
        },
      },
      defaults: {
        global: {
          ripple: false,
          density: 'compact',
        },
        VBtn: {
          variant: 'flat',
          style: 'text-transform: none;',
          slim: true,
        },
        VSelect: {
          variant: 'outlined',
        },
        VTextField: {
          variant: 'outlined',
        },
      },
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/main.scss" as *;',
        },
      },
    },
  },

  compatibilityDate: '2025-03-19',
});
