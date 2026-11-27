import type { Style } from "../styles.ts"
import type { Preset } from "./codec.ts"
import { normalizePreset } from "./normalize.ts"

export type NamedPreset = {
  title: string
  // The fonts; every named preset uses Lucide icons.
  description: string
  preset: Preset
}

const base = {
  iconLibrary: "lucide",
  baseColor: "neutral",
  theme: "neutral",
  chartColor: "neutral",
  fontHeading: "inherit",
  menuAccent: "subtle",
  menuColor: "default",
  radius: "default"
} as const

// One preset per style, from shadcn/ui 055aa6b,
// packages/shadcn/src/preset/defaults.ts (MIT), all with Lucide icons.
export const DEFAULT_PRESETS: Record<Style, NamedPreset> = {
  nova: {
    title: "Nova",
    description: "Geist",
    preset: { ...base, style: "nova", font: "geist" }
  },
  vega: {
    title: "Vega",
    description: "Inter",
    preset: { ...base, style: "vega", font: "inter" }
  },
  maia: {
    title: "Maia",
    description: "Figtree",
    preset: { ...base, style: "maia", font: "figtree" }
  },
  lyra: {
    title: "Lyra",
    description: "JetBrains Mono",
    preset: normalizePreset({ ...base, style: "lyra", font: "jetbrains-mono" })
  },
  mira: {
    title: "Mira",
    description: "Inter",
    preset: { ...base, style: "mira", font: "inter" }
  },
  luma: {
    title: "Luma",
    description: "Inter",
    preset: { ...base, style: "luma", font: "inter" }
  },
  sera: {
    title: "Sera",
    description: "Noto Sans + Playfair Display",
    preset: normalizePreset({
      ...base,
      style: "sera",
      baseColor: "taupe",
      theme: "taupe",
      chartColor: "taupe",
      font: "noto-sans",
      fontHeading: "playfair-display"
    })
  },
  rhea: {
    title: "Rhea",
    description: "Inter",
    preset: { ...base, style: "rhea", font: "inter" }
  }
}

export const DEFAULT_PRESET_NAME: Style = "nova"
