// Field order and widths from shadcn/ui f50887a, packages/registry/src/preset/preset.ts (MIT).
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const styles = [
  "nova",
  "vega",
  "maia",
  "lyra",
  "mira",
  "luma",
  "sera",
  "rhea"
] as const
export const baseColors = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "mauve",
  "olive",
  "mist",
  "taupe"
] as const
const themes = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "amber",
  "blue",
  "cyan",
  "emerald",
  "fuchsia",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "rose",
  "sky",
  "teal",
  "violet",
  "yellow",
  "mauve",
  "olive",
  "mist",
  "taupe"
] as const
const fonts = [
  "inter",
  "noto-sans",
  "nunito-sans",
  "figtree",
  "roboto",
  "raleway",
  "dm-sans",
  "public-sans",
  "outfit",
  "jetbrains-mono",
  "geist",
  "geist-mono",
  "lora",
  "merriweather",
  "playfair-display",
  "noto-serif",
  "roboto-slab",
  "oxanium",
  "manrope",
  "space-grotesk",
  "montserrat",
  "ibm-plex-sans",
  "source-sans-3",
  "instrument-sans",
  "eb-garamond",
  "instrument-serif"
] as const
const headingFonts = ["inherit", ...fonts] as const
const radii = ["default", "none", "small", "medium", "large"] as const
const menuAccents = ["subtle", "bold"] as const
const menuColors = [
  "default",
  "inverted",
  "default-translucent",
  "inverted-translucent"
] as const

export const presetOptions = {
  menuColor: menuColors,
  menuAccent: menuAccents,
  radius: radii,
  font: fonts,
  theme: themes,
  baseColor: baseColors,
  style: styles,
  chartColor: themes,
  fontHeading: headingFonts
}

export type Preset = {
  [Field in keyof typeof presetOptions]: (typeof presetOptions)[Field][number]
}

const fieldLayout = {
  menuColor: [0, 3],
  menuAccent: [3, 3],
  radius: [6, 4],
  font: [10, 6],
  // Offsets 16–21 are reserved for the icon library; zero encodes Lucide.
  theme: [22, 6],
  baseColor: [28, 6],
  style: [34, 6],
  chartColor: [40, 6],
  fontHeading: [46, 5]
} as const satisfies Record<keyof Preset, readonly [number, number]>

const fields = Object.keys(fieldLayout) as (keyof Preset)[]

function unpackPreset(bits: number): Preset {
  return Object.fromEntries(
    fields.map((field) => {
      const [offset, width] = fieldLayout[field]
      const values = presetOptions[field]
      const index = Math.floor(bits / 2 ** offset) % 2 ** width
      return [field, values[index] ?? values[0]]
    })
  ) as Preset
}

export const defaultPreset = unpackPreset(0)

export function encodePreset(preset: Preset): string {
  let bits = 0
  for (const field of fields) {
    const values: readonly string[] = presetOptions[field]
    const index = values.indexOf(preset[field])
    bits += Math.max(index, 0) * 2 ** fieldLayout[field][0]
  }
  let code = ""
  do {
    code = BASE62[bits % 62] + code
    bits = Math.floor(bits / 62)
  } while (bits > 0)
  return `b${code}`
}

export function decodePreset(code: string): Preset | null {
  if (!/^b[0-9A-Za-z]{1,9}$/.test(code)) return null

  let bits = 0
  for (const digit of code.slice(1)) bits = bits * 62 + BASE62.indexOf(digit)

  return bits < 2 ** 51 ? unpackPreset(bits) : null
}
