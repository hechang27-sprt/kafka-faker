import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetWind4,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";

export default defineConfig({
    shortcuts: [
        {
            "blockify-fill-wh":
                "block w-full h-full decoration-none color-inherit",
        },
    ],
    presets: [
        presetWind4(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: "DM Sans",
                serif: "DM Serif Display",
                mono: "DM Mono",
            },
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
});
