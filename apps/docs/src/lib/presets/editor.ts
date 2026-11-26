import {
  decodePreset,
  encodePreset,
  normalizePreset,
  parsePresetInput,
  presetOptions,
  type Preset
} from "@solid-ui/registry/preset"

export type PresetField = keyof Preset
export type PresetLocks = ReadonlySet<PresetField>

// Curated shadcn Create shuffle presets (f50887a, MIT), sourced upstream from dialectcn.xyz.
const shuffleCodes = [
  "b6sUj34d9",
  "b2tqYzpa88",
  "b1W4tDrk",
  "b1aIuQ2XC",
  "b7jsW1RxJ5",
  "b870VEw0in",
  "b3Zheoix4U",
  "b1x9M2c4aI",
  "b1W7jDEW",
  "b51GFh7y6",
  "b2fms620zo",
  "b1Q5GC",
  "buKEvLs",
  "b5rR41Mtnc",
  "b6tOz2I0x",
  "b2hNTREGRN",
  "bdIJ7Sq",
  "b6TqMNb5Wb",
  "bJIirQ",
  "b4aRK5K0fb",
  "b5HCiD38LI",
  "bdHjvCi",
  "b7QDHijUjj",
  "b4ZVZIPi9h",
  "b1W4bcno"
]
const shufflePresets = shuffleCodes
  .map(decodePreset)
  .filter((preset) => preset !== null)

export function parseEditorPreset(input: string): Preset | null {
  const preset = parsePresetInput(input)
  return preset && normalizePreset(preset)
}

function keepLockedHeading(current: Preset, next: Preset, locks: PresetLocks) {
  if (
    locks.has("fontHeading") &&
    current.fontHeading === "inherit" &&
    current.font !== next.font
  )
    next.fontHeading = current.font
}

export function editPreset(
  current: Preset,
  field: PresetField,
  value: string,
  locks: PresetLocks
): Preset | null {
  const options: readonly string[] = presetOptions[field]
  if (!options.includes(value) || value === "gray") return null
  if (current[field] === value) return current
  const next: Preset = { ...current, [field]: value }
  if (field === "baseColor") {
    if (!locks.has("theme")) next.theme = next.baseColor
    if (!locks.has("chartColor")) next.chartColor = next.baseColor
  }
  if (field === "font") {
    if (!locks.has("fontHeading")) next.fontHeading = "inherit"
    keepLockedHeading(current, next, locks)
  }
  const normalized = normalizePreset(next)
  if (normalized[field] !== value) return null
  for (const locked of locks) {
    if (locked !== field && normalized[locked] !== next[locked]) return null
  }
  return normalized
}

export function shufflePreset(
  current: Preset,
  locks: PresetLocks,
  random = Math.random
): Preset | null {
  const currentCode = encodePreset(current)
  const candidates = new Map<string, Preset>()
  for (const preset of shufflePresets) {
    const next = { ...preset }
    for (const field of locks) Object.assign(next, { [field]: current[field] })
    keepLockedHeading(current, next, locks)
    const normalized = normalizePreset(next)
    if ([...locks].some((field) => normalized[field] !== next[field])) continue
    const code = encodePreset(normalized)
    if (code !== currentCode) candidates.set(code, normalized)
  }
  const values = [...candidates.values()]
  return values[Math.floor(random() * values.length)] ?? null
}
