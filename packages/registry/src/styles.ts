// Display order of the visual styles. Preset codes encode styles in their own
// order, which must not change; see preset/codec.ts.
export const styles = [
  "vega",
  "nova",
  "maia",
  "lyra",
  "mira",
  "luma",
  "sera",
  "rhea"
] as const

export type Style = (typeof styles)[number]

export const DEFAULT_STYLE: Style = "nova"

export function isStyle(value: unknown): value is Style {
  return styles.some((style) => style === value)
}
