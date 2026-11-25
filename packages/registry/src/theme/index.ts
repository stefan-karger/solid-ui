import { type Preset } from "../preset/codec.ts"
import { isCompatiblePresetColor } from "../preset/normalize.ts"
import { fontFamilies } from "./fonts.ts"
// The OKLCH values come from shadcn/ui f50887a, apps/v4/registry/themes.ts (MIT).
import palettes from "./palettes.json" with { type: "json" }

export { palettes }
export {
  fontCategory,
  fontFamilies,
  fontPackage,
  fontStack,
  presetFonts,
  type Font,
  type FontCategory
} from "./fonts.ts"

const radii = {
  default: "0.625rem",
  none: "0px",
  small: "0.45rem",
  medium: "0.625rem",
  large: "0.875rem"
} satisfies Record<Preset["radius"], string>

function resolvePalette(
  name: Preset["theme"],
  base: Exclude<Preset["baseColor"], "gray">
) {
  return name !== "gray" && isCompatiblePresetColor(name, base) ? name : base
}

export function resolvePresetTheme(preset: Preset) {
  const base = preset.baseColor === "gray" ? "neutral" : preset.baseColor
  const theme = resolvePalette(preset.theme, base)
  const chart = resolvePalette(preset.chartColor, base)
  const translucentMenu = preset.menuColor.endsWith("translucent")
  const invertedMenu = preset.menuColor.startsWith("inverted")

  const radius =
    preset.style === "lyra" || preset.style === "sera"
      ? radii.none
      : preset.style === "rhea" && preset.radius === "large"
        ? radii.default
        : radii[preset.radius]

  function colors(mode: "light" | "dark") {
    const merged = {
      ...palettes[base][mode],
      ...palettes[theme][mode]
    }
    const chartColors = palettes[chart][mode]

    return {
      ...merged,
      "chart-1": chartColors["chart-1"],
      "chart-2": chartColors["chart-2"],
      "chart-3": chartColors["chart-3"],
      "chart-4": chartColors["chart-4"],
      "chart-5": chartColors["chart-5"],
      ...(preset.menuAccent === "bold" &&
        !translucentMenu && {
          accent: merged.primary,
          "accent-foreground": merged["primary-foreground"]
        }),
      "destructive-foreground":
        mode === "dark" ? "oklch(0.58 0.22 27)" : "oklch(0.97 0.01 17)",
      surface: mode === "dark" ? "oklch(0.2 0 0)" : "oklch(0.98 0 0)",
      "surface-foreground":
        mode === "dark" ? "oklch(0.708 0 0)" : "var(--foreground)",
      code: "var(--surface)",
      "code-foreground": "var(--surface-foreground)",
      "code-highlight": "var(--accent)",
      "code-number": mode === "dark" ? "oklch(0.708 0 0)" : "oklch(0.556 0 0)",
      selection: mode === "dark" ? "oklch(0.922 0 0)" : "oklch(0 0 0)",
      "selection-foreground":
        mode === "dark" ? "oklch(0.205 0 0)" : "oklch(1 0 0)",
      radius
    }
  }

  return {
    light: colors("light"),
    dark: colors("dark"),
    radius,
    fontFamily: fontFamilies[preset.font],
    headingFamily:
      fontFamilies[
        preset.fontHeading === "inherit" ? preset.font : preset.fontHeading
      ],
    translucentMenu,
    invertedMenu
  }
}

export type PresetTheme = ReturnType<typeof resolvePresetTheme>
