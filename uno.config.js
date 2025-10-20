"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unocss_1 = require("unocss");
exports.default = (0, unocss_1.defineConfig)({
    shortcuts: [],
    presets: [
        (0, unocss_1.presetWind4)(),
        (0, unocss_1.presetAttributify)(),
        (0, unocss_1.presetIcons)({
            scale: 1.2,
        }),
        (0, unocss_1.presetTypography)(),
        (0, unocss_1.presetWebFonts)({
            fonts: {
                sans: "DM Sans",
                serif: "DM Serif Display",
                mono: "DM Mono",
            },
        }),
    ],
    transformers: [
        (0, unocss_1.transformerDirectives)(),
        (0, unocss_1.transformerVariantGroup)(),
    ],
});
