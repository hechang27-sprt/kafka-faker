import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetWind4,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    shortcuts: [],
    presets: [
        presetWind4(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'DM Sans',
                serif: 'DM Serif Display',
                mono: 'DM Mono',
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})