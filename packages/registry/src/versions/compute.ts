// The exact pins in the repository are the versions the docs and tests run
// against. Supported ranges are derived from them: `^<pin>` for a release and
// the pin itself for a prerelease, since prereleases may break between builds.

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

// Read from the root manifest, where the adapter and CLI tests pin them.
export const ROOT_REQUIREMENTS = ["vite", "@solidjs/vite-plugin"] as const

// Read from the docs manifest.
export const DOCS_REQUIREMENTS = [
  "solid-js",
  "@solidjs/web",
  "tailwindcss"
] as const

export function toSupportedRange(name: string, pin: string | undefined) {
  if (!pin || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(pin)) {
    throw new Error(`${name} must be pinned to an exact version, found ${pin}`)
  }
  return pin.includes("-") ? pin : `^${pin}`
}

function pinOf(manifest: PackageManifest, name: string) {
  return manifest.dependencies?.[name] ?? manifest.devDependencies?.[name]
}

export function computeSupportedVersions(
  root: PackageManifest,
  docs: PackageManifest
): SupportedVersions {
  const requirements: Record<string, string> = {}
  for (const name of DOCS_REQUIREMENTS)
    requirements[name] = toSupportedRange(name, pinOf(docs, name))
  for (const name of ROOT_REQUIREMENTS)
    requirements[name] = toSupportedRange(name, pinOf(root, name))

  const packages: Record<string, string> = {}
  for (const [name, pin] of Object.entries(docs.dependencies ?? {}).sort(
    ([a], [b]) => a.localeCompare(b)
  )) {
    // Workspace and file links are not published versions.
    if (name in requirements || /^(?:workspace|file):/.test(pin)) continue
    packages[name] = toSupportedRange(name, pin)
  }

  return { requirements, packages }
}
