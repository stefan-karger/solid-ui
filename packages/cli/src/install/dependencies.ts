import { supportedRange } from "@solid-ui/registry/versions"

import type { PackageJson } from "~/project/package-json"
import { resolveVersion, satisfies } from "~/project/versions"
import type { Ui } from "~/utils/ui"

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

// The package with the range this release was tested with.
export function supportedSpec(name: string) {
  const range = supportedRange(name)
  return range ? `${name}@${range}` : name
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

// A prerelease range is one exact build (UI SDK betas): the components are
// written against it, and other betas may break them.
const isExactBuild = (range: string) => range.includes("-")

// The specs to install: the missing packages, plus each conflict the user
// agrees to change. Installed versions only change after a yes; --yes is
// that yes for the exact builds the components need, never for the rest.
export async function resolveConflicts(
  plan: DependencyPlan,
  ui: Ui,
  { ask, yes }: { ask: boolean; yes: boolean }
) {
  const install = [...plan.install]
  for (const conflict of plan.conflicts) {
    const { name, found, range, spec } = conflict
    const needed = isExactBuild(range)
    const question = needed
      ? `The components need ${name} ${range}, the project has ${found}. Install ${spec}?`
      : `${name} ${found} is outside the tested range ${range}. Install ${spec}?`
    if ((needed && yes) || (ask && (await ui.confirm(question, needed))))
      install.push(spec)
    else
      ui.warn(
        needed
          ? `Kept ${name} ${found}. The components are built for ${range} and may break with another build.`
          : `Kept ${name} ${found}. Solid UI is tested with ${range}.`
      )
  }
  return install
}
