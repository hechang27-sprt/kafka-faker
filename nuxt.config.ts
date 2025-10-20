// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: [
        "@element-plus/nuxt",
        "@nuxt/eslint",
        "@unocss/nuxt",
        "@pinia/nuxt",
    ],
    build: { transpile: ["trpc-nuxt"] },
    app: {
        rootAttrs: {
            class: "",
        },
    },
    nitro: {
        storage: {
            db: {
                driver: "fs",
                base: "./.data/db",
            },
        },
    },
});
