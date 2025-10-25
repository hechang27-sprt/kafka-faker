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
        "@vueuse/nuxt",
    ],
    build: { transpile: ["trpc-nuxt"] },
    app: {
        rootAttrs: {
            class: "",
        },
    },
    nitro: {
        storage: {
            schemas: {
                driver: "fs",
                base: ".data/schemas",
            },
            cache: {
                driver: "redis",
                base: process.env.KAFKA_FAKER_STORAGE_CACHE_BASE,
                host: process.env.KAFKA_FAKER_REDIS_HOST,
                port: process.env.KAFKA_FAKER_REDIS_PORT,
                password: process.env.KAFKA_FAKER_REDIS_PASSWORD,
            },
            config: {
                driver: "fs",
                base: ".data/config",
            },
        },
    },
    runtimeConfig: {
        // ...
    },
});
