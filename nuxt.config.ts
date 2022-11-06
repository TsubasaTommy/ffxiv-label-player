// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // Docs: https://tailwindcss.nuxtjs.org
    "@nuxtjs/tailwindcss",
  ],
  head: {
    title: 'FFXIV Player Label',
    link: [{ rel: "icon", type: "image/x-icon", href: "./static/logos/favion.ico" }]
  },
  app: {
    head: {
      htmlAttrs: {
        "data-theme": "dark",
      },
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
