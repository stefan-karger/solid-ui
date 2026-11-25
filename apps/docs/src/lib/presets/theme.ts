import { baseColors, type Preset } from "@solid-ui/registry/preset"
import {
  fontFamilies,
  palettes,
  type PresetTheme
} from "@solid-ui/registry/theme"

// Swatches follow shadcn/ui 055aa6b, apps/v4/app/(app)/(create)/components/theme-picker.tsx (MIT).
export function presetColorSwatch(color: Preset["theme"]) {
  const { dark } = palettes[color === "gray" ? "neutral" : color]
  return baseColors.some((base) => base === color) && "muted-foreground" in dark
    ? dark["muted-foreground"]
    : dark.primary
}

// Picker order and groups from shadcn/ui 055aa6b, apps/v4/lib/font-definitions.ts (MIT).
export const fontGroups = [
  {
    label: "Sans",
    fonts: [
      "geist",
      "inter",
      "noto-sans",
      "nunito-sans",
      "figtree",
      "roboto",
      "raleway",
      "dm-sans",
      "public-sans",
      "outfit",
      "oxanium",
      "manrope",
      "space-grotesk",
      "montserrat",
      "ibm-plex-sans",
      "source-sans-3",
      "instrument-sans"
    ]
  },
  { label: "Mono", fonts: ["geist-mono", "jetbrains-mono"] },
  {
    label: "Serif",
    fonts: [
      "noto-serif",
      "roboto-slab",
      "merriweather",
      "lora",
      "playfair-display",
      "eb-garamond",
      "instrument-serif"
    ]
  }
] as const satisfies readonly {
  label: string
  fonts: readonly Preset["font"][]
}[]

export function fontLabel(font: Preset["font"]) {
  return fontFamilies[font].replace(/ Variable$/, "")
}

function cssRule(selector: string, tokens: Record<string, string | undefined>) {
  return `${selector}{${Object.entries(tokens)
    .map(([key, value]) => `--${key}:${value};`)
    .join("")}}`
}

export function presetThemeCss(theme: PresetTheme) {
  const root = "html[data-preset-preview]"
  return [
    cssRule(root, {
      ...theme.light,
      "preview-font-sans": `"${theme.fontFamily}", system-ui, sans-serif`,
      "preview-font-heading": `"${theme.headingFamily}", var(--preview-font-sans)`
    }),
    cssRule(`${root}.dark`, theme.dark),
    theme.invertedMenu ? cssRule(`${root} .cn-menu-target`, theme.dark) : ""
  ].join("\n")
}
