// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
    rules: {
        "vue/no-unused-vars": [
            "warn",
            {
                ignorePattern: "^_",
            },
        ],
        "vue/multi-word-component-names": "off",
    },
});
