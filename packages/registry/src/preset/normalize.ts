import { baseColors, type Preset } from "./codec.ts"

export function isCompatiblePresetColor(
  name: Preset["theme"],
  base: Preset["baseColor"]
) {
  return (
    name !== "gray" &&
    (name === base || !baseColors.some((color) => color === name))
  )
}

// Applies the rules the Create page enforces: gray maps to neutral, accent
// and chart colors must fit the base color, lyra and sera have no radius, rhea
// caps it, and translucent menus keep a subtle accent.
export function normalizePreset(preset: Preset): Preset {
  const baseColor = preset.baseColor === "gray" ? "neutral" : preset.baseColor
  return {
    ...preset,
    baseColor,
    theme: isCompatiblePresetColor(preset.theme, baseColor)
      ? preset.theme
      : baseColor,
    chartColor: isCompatiblePresetColor(preset.chartColor, baseColor)
      ? preset.chartColor
      : baseColor,
    radius:
      preset.style === "lyra" || preset.style === "sera"
        ? "none"
        : preset.style === "rhea" && preset.radius === "large"
          ? "default"
          : preset.radius,
    menuAccent: preset.menuColor.endsWith("translucent")
      ? "subtle"
      : preset.menuAccent
  }
}
