import type { Registry } from "@solid-ui/registry/schema"

import { CliError } from "~/utils/errors"

type CatalogItem = Registry["items"][number]

// Items init already provides; add never writes them again.
export const PROVIDED_BY_INIT = new Set(["style-utilities"])

const INSTALLABLE = new Set([
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:component",
  "registry:block"
])

export function installableItems(catalog: Registry) {
  return catalog.items.filter(
    (item) => INSTALLABLE.has(item.type) && !PROVIDED_BY_INIT.has(item.name)
  )
}

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]!
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const current = row[j]!
      row[j] = Math.min(
        row[j]! + 1,
        row[j - 1]! + 1,
        previous + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
      previous = current
    }
  }
  return row[b.length]!
}

export function suggest(name: string, names: string[]) {
  return names
    .map((candidate) => ({
      candidate,
      score:
        candidate.includes(name) || name.includes(candidate)
          ? 0
          : distance(name, candidate)
    }))
    .filter(({ score }) => score <= 3)
    .sort((a, b) => a.score - b.score || a.candidate.localeCompare(b.candidate))
    .slice(0, 3)
    .map(({ candidate }) => candidate)
}

// The requested items and their registry dependencies, dependencies first,
// each once.
export function resolveTree(catalog: Registry, names: string[]): CatalogItem[] {
  const byName = new Map(
    installableItems(catalog).map((item) => [item.name, item])
  )
  const unknown = names.filter((name) => !byName.has(name))
  if (unknown.length) {
    const lines = unknown.map((name) => {
      const close = suggest(name, [...byName.keys()])
      return close.length
        ? `  ${name} (did you mean ${close.join(", ")}?)`
        : `  ${name}`
    })
    throw new CliError(
      `The registry has no installable item named:\n${lines.join("\n")}`
    )
  }

  const ordered: CatalogItem[] = []
  const done = new Set<string>()
  const visiting = new Set<string>()
  const visit = (name: string) => {
    if (done.has(name) || PROVIDED_BY_INIT.has(name)) return
    if (visiting.has(name))
      throw new CliError(`The registry has a dependency cycle at ${name}.`)
    const item = byName.get(name)
    if (!item) throw new CliError(`${name} depends on a missing item.`)
    visiting.add(name)
    for (const dependency of item.registryDependencies ?? []) visit(dependency)
    visiting.delete(name)
    done.add(name)
    ordered.push(item)
  }
  for (const name of names) visit(name)
  return ordered
}
