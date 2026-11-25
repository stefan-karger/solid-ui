import path from "node:path"

import semver from "semver"

import {
  declaredRange,
  readPackageJson,
  type PackageJson
} from "./package-json"

export type ResolvedVersion =
  | { name: string; source: "installed"; version: string; declared?: string }
  | { name: string; source: "declared"; version: string; declared: string }
  | { name: string; source: "unresolved"; declared: string }
  | { name: string; source: "missing" }

// Finds the version Node would load from `cwd`, walking up through
// node_modules like the resolver does. Reading the package.json directly works
// for packages whose exports map hides it.
export function findInstalledVersion(cwd: string, name: string) {
  let dir = path.resolve(cwd)
  for (;;) {
    const version = readPackageJson(
      path.join(dir, "node_modules", name)
    )?.version
    if (version) return version
    const parent = path.dirname(dir)
    if (parent === dir) return undefined
    dir = parent
  }
}

// The installed version, else the lowest version the declared range allows.
// A range like `latest` or a workspace link can't be read without an install.
export function resolveVersion(
  cwd: string,
  pkg: PackageJson,
  name: string
): ResolvedVersion {
  const declared = declaredRange(pkg, name)
  const installed = findInstalledVersion(cwd, name)
  if (declared === undefined) {
    return installed
      ? { name, source: "installed", version: installed }
      : { name, source: "missing" }
  }
  if (installed)
    return { name, source: "installed", version: installed, declared }

  const lowest = semver.validRange(declared)
    ? semver.minVersion(declared)
    : null
  return lowest
    ? { name, source: "declared", version: lowest.version, declared }
    : { name, source: "unresolved", declared }
}

export function satisfies(version: string, range: string) {
  return semver.satisfies(version, range, { includePrerelease: true })
}

export function majorOf(version: string) {
  return semver.major(version)
}

export function isBelowRange(version: string, range: string) {
  const lowest = semver.minVersion(range)
  return lowest ? semver.lt(version, lowest) : false
}
