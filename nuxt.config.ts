// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  modules: [
    // Docs: https://tailwindcss.nuxtjs.org
    "@nuxtjs/tailwindcss",
  ],

  app: {
    head: {
      htmlAttrs: {
        "data-theme": "dark",
      },
      viewport: 'width=500, initial-scale=1',
      title: 'FFXIV Player Label',
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
  },
  vite: {
    define: {
      "process.env.TESS_ENV": process.env.ENV,
    },
  },
  css: [
    '@mdi/font/css/materialdesignicons.css'
  ]
})
