// The exact pins in the repository are the versions the docs and tests run
// against. Supported ranges are derived from them; a prerelease stays pinned,
// since prereleases may break between builds.
//
// Packages init installs get `^<pin>`: a new install starts at the tested
// version. Requirements a project already has start at the pin's minor:
// patches only fix bugs, so an older patch is fine and init leaves it alone,
// while a minor can add features the components use (Tailwind utilities,
// Vite's resolve.tsconfigPaths).

export type PackageManifest = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export type SupportedVersions = {
  // Packages a project must already have; init checks them before it runs.
  requirements: Record<string, string>
  // Packages init and the registry install, keyed by name.
  packages: Record<string, string>
}

// Packages a project brings itself. The registry never lists them as
// dependencies and the CLI never installs them.
export const PROJECT_PACKAGES = [
  "solid-js",
  "@solidjs/web",
  "tailwindcss"
] as const

// The project packages init checks. @solidjs/web moves in lockstep with
// solid-js, and a Solid 2 app comes with Vite 8 and its Solid plugin.
export const REQUIREMENTS = ["solid-js", "tailwindcss"] as const

export function toSupportedRange(name: string, pin: string | undefined) {
  if (!pin || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(pin)) {
    throw new Error(`${name} must be pinned to an exact version, found ${pin}`)
  }
  return pin.includes("-") ? pin : `^${pin}`
}

// `^major.minor.0` for a requirement's pin, the pin itself for a prerelease.
export function toRequirementRange(name: string, pin: string | undefined) {
  const range = toSupportedRange(name, pin)
  return range.startsWith("^") ? range.replace(/\.\d+$/, ".0") : range
}

function pinOf(manifest: PackageManifest, name: string) {
  return manifest.dependencies?.[name] ?? manifest.devDependencies?.[name]
}

export function computeSupportedVersions(
  docs: PackageManifest
): SupportedVersions {
  const requirements: Record<string, string> = {}
  for (const name of REQUIREMENTS)
    requirements[name] = toRequirementRange(name, pinOf(docs, name))

  const packages: Record<string, string> = {}
  for (const [name, pin] of Object.entries(docs.dependencies ?? {}).sort(
    ([a], [b]) => a.localeCompare(b)
  )) {
    // Workspace and file links are not published versions.
    if (
      (PROJECT_PACKAGES as readonly string[]).includes(name) ||
      /^(?:workspace|file):/.test(pin)
    )
      continue
    packages[name] = toSupportedRange(name, pin)
  }

  return { requirements, packages }
}
