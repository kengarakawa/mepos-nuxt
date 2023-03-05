// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  // modules: [
  //   '@nuxtjs/dayjs'
  // ] ,

  // layouts: {
  //   'backend': '~~/layouts/backend.vue'
  // },
  // pageTransition: {
  //   name: 'my-transition',
  //   mode: 'out-in'
  // },
  
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    },
  },
  modules: [
    "nuxt-icon",
    // 'pinia',
    [
      '@pinia/nuxt' , {
        autoImports: [
          ['defineStore', 'definePiniaStore'], 
        ]
      }
    ] ,
    '@pinia-plugin-persistedstate/nuxt' , 
    'nuxt-vue3-google-signin',         
  ],
  googleSignIn: {
    clientId: '253182253262-uhbu70rtgv08ok7e2qjt67t9m63jifl5.apps.googleusercontent.com',
  }, 
  // buildModules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.css" , 
  '~~/styles/style.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
