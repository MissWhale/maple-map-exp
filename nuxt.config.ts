import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import './env';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      nxopenApiKey: process.env.NEXT_PUBLIC_NXOPEN_API_KEY,
    },
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        types: ['node'],
      },
    },
  },
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

  // sourcemap: {
  //   server: false,
  //   client: false,
  // },
  // css: ['@/assets/global.css'],
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
        // css: {
        //   additionalData: '@import "~/assets/base.css";',
        // },
        // scss: {
        //   additionalData: `
        //   @use "@/assets/variables/_variables.scss" as *;
        //   @use "vuetify/lib/styles/settings/variables" as *;
        //   @import "~/assets/main.scss";`,
        //   // additionalData: '@import "~/assets/global.scss";',
        // },
      },
    },
  },

  compatibilityDate: '2025-03-19',
});
