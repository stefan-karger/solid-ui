import type { PackageJson } from "~/project/package-json"
import { resolveVersion, satisfies } from "~/project/versions"

export type DependencyConflict = {
  name: string
  range: string
  found: string
  spec: string
}

export type DependencyPlan = {
  // Specs to install: packages the project doesn't have yet.
  install: string[]
  // Installed packages whose version is outside the range. They are only
  // changed when the user agrees.
  conflicts: DependencyConflict[]
  satisfied: string[]
}

export function parseSpec(spec: string) {
  const at = spec.indexOf("@", spec.startsWith("@") ? 1 : 0)
  return at === -1
    ? { name: spec, range: "" }
    : { name: spec.slice(0, at), range: spec.slice(at + 1) }
}

// Compares the wanted ranges with the project. Nothing is ever downgraded or
// upgraded without a conflict entry.
export function planDependencies(
  cwd: string,
  pkg: PackageJson,
  specs: string[]
): DependencyPlan {
  const plan: DependencyPlan = { install: [], conflicts: [], satisfied: [] }
  const seen = new Set<string>()
  for (const spec of specs) {
    const { name, range } = parseSpec(spec)
    if (seen.has(name)) continue
    seen.add(name)
    const resolved = resolveVersion(cwd, pkg, name)
    if (resolved.source === "missing") plan.install.push(spec)
    else if (!range) plan.satisfied.push(name)
    else if (!("version" in resolved))
      plan.conflicts.push({ name, range, found: resolved.declared, spec })
    else if (satisfies(resolved.version, range)) plan.satisfied.push(name)
    else plan.conflicts.push({ name, range, found: resolved.version, spec })
  }
  return plan
}
