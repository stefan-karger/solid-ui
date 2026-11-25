import type { Preset } from "../preset/codec.ts"

export type Font = Preset["font"]

export const fontFamilies: Record<Preset["font"], string> = {
  inter: "Inter Variable",
  "noto-sans": "Noto Sans Variable",
  "nunito-sans": "Nunito Sans Variable",
  figtree: "Figtree Variable",
  roboto: "Roboto Variable",
  raleway: "Raleway Variable",
  "dm-sans": "DM Sans Variable",
  "public-sans": "Public Sans Variable",
  outfit: "Outfit Variable",
  "jetbrains-mono": "JetBrains Mono Variable",
  geist: "Geist Variable",
  "geist-mono": "Geist Mono Variable",
  lora: "Lora Variable",
  merriweather: "Merriweather Variable",
  "playfair-display": "Playfair Display Variable",
  "noto-serif": "Noto Serif Variable",
  "roboto-slab": "Roboto Slab Variable",
  oxanium: "Oxanium Variable",
  manrope: "Manrope Variable",
  "space-grotesk": "Space Grotesk Variable",
  montserrat: "Montserrat Variable",
  "ibm-plex-sans": "IBM Plex Sans Variable",
  "source-sans-3": "Source Sans 3 Variable",
  "instrument-sans": "Instrument Sans Variable",
  "eb-garamond": "EB Garamond Variable",
  "instrument-serif": "Instrument Serif"
}
export type FontCategory = "sans" | "serif" | "mono"

const monoFonts = new Set<Font>(["geist-mono", "jetbrains-mono"])
const serifFonts = new Set<Font>([
  "noto-serif",
  "roboto-slab",
  "merriweather",
  "lora",
  "playfair-display",
  "eb-garamond",
  "instrument-serif"
])

const fallbacks: Record<FontCategory, string> = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace"
}

export function fontCategory(font: Font): FontCategory {
  return monoFonts.has(font) ? "mono" : serifFonts.has(font) ? "serif" : "sans"
}

// The Fontsource package that ships each font. Instrument Serif has no
// variable build.
export function fontPackage(font: Font): string {
  return font === "instrument-serif"
    ? "@fontsource/instrument-serif"
    : `@fontsource-variable/${font}`
}

export function fontStack(font: Font): string {
  return `"${fontFamilies[font]}", ${fallbacks[fontCategory(font)]}`
}

// The body font, plus the heading font when the preset sets its own.
export function presetFonts(preset: Preset): Font[] {
  return preset.fontHeading === "inherit" || preset.fontHeading === preset.font
    ? [preset.font]
    : [preset.font, preset.fontHeading]
}
