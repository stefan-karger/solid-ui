import { posix } from "node:path"

import ts from "typescript"

import { registry } from "~/registry"
import type { RegistryItem } from "~/registry/schema"

import { dependencies as installedDependencies } from "../../package.json"
import { type DocsStyle } from "./appearance"
import { ACTIVE_REGISTRY_STYLE } from "./registry-source"
import { getRegistrySource } from "./registry.server"

const installableTypes = new Set<RegistryItem["type"]>([
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:style",
  "registry:component",
  "registry:block"
])

export const installableItems = registry.items.filter((item) =>
  installableTypes.has(item.type)
)

const owners = new Map(
  installableItems.flatMap((item) =>
    (item.files ?? []).map(
      ({ path }) => [path.replace(/\.[^.]+$/, ""), item.name] as const
    )
  )
)

function toRegistryPath(specifier: string) {
  return specifier
    .replace(/^~\/components\/ui\//, "ui/")
    .replace(/^~\/(?=lib\/|hooks\/)/, "")
    .replace(/\.(?:tsx?|jsx?)$/, "")
}

async function prepareInstallableItem(
  item: RegistryItem,
  styleName?: DocsStyle
): Promise<RegistryItem> {
  const packages = new Set(item.dependencies ?? [])
  const registryDependencies = new Set(item.registryDependencies ?? [])
  const files = await Promise.all(
    (item.files ?? []).map(async (file) => ({
      ...file,
      content: (
        await getRegistrySource({
          name: item.name,
          file: file.path,
          ...(styleName ? { styleName } : {})
        })
      ).code
    }))
  )

  for (const file of files) {
    if (!/\.[jt]sx?$/.test(file.path)) continue
    for (const { fileName } of ts.preProcessFile(file.content, true, true)
      .importedFiles) {
      if (fileName.startsWith("~/") || fileName.startsWith(".")) {
        const path = fileName.startsWith(".")
          ? posix.join(posix.dirname(file.path), fileName)
          : fileName
        const owner = owners.get(toRegistryPath(path))
        if (!owner)
          throw new Error(
            `[registry] ${file.path} imports an unpublished file: ${fileName}`
          )
        if (owner !== item.name) registryDependencies.add(owner)
      } else if (!fileName.startsWith("node:")) {
        const parts = fileName.split("/")
        packages.add(parts.slice(0, fileName.startsWith("@") ? 2 : 1).join("/"))
      }
    }
  }

  return {
    ...item,
    files,
    dependencies: [...packages].sort().map((name) => {
      const version =
        installedDependencies[name as keyof typeof installedDependencies]
      return version ? `${name}@${version}` : name
    }),
    registryDependencies: [...registryDependencies].sort()
  }
}

let catalog: Promise<Map<string, RegistryItem>> | undefined

function getDistributionCatalog() {
  return (catalog ??= Promise.all(
    installableItems.map((item) => prepareInstallableItem(item))
  ).then((items) => {
    const byName = new Map(items.map((item) => [item.name, item]))
    const visiting = new Set<string>()
    const visited = new Set<string>()
    function visit(name: string) {
      if (visited.has(name)) return
      if (visiting.has(name))
        throw new Error(`[registry] Dependency cycle at "${name}"`)
      const item = byName.get(name)
      if (!item)
        throw new Error(`[registry] No installable item named "${name}"`)
      visiting.add(name)
      for (const dependency of item.registryDependencies ?? [])
        visit(dependency)
      visiting.delete(name)
      visited.add(name)
    }
    for (const name of byName.keys()) visit(name)
    return byName
  }))
}

export async function getDistributionItem(name: string, styleName?: DocsStyle) {
  const item = (await getDistributionCatalog()).get(name)
  if (!item) throw new Error(`[registry] No installable item named "${name}"`)
  if (!styleName || styleName === ACTIVE_REGISTRY_STYLE) return item
  const files = await Promise.all(
    (item.files ?? []).map(async (file) => ({
      ...file,
      content: (await getRegistrySource({ name, file: file.path, styleName }))
        .code
    }))
  )
  return { ...item, files }
}

export async function getDistributionIndex() {
  return [...(await getDistributionCatalog()).values()].map((item) => ({
    ...item,
    files: item.files?.map(({ path, type, target }) => ({ path, type, target }))
  }))
}

// The published CLI writes TypeScript sources into its configured component directory.
export const legacyItems = installableItems.filter(
  ({ type, name }) =>
    name !== "utils" && (type === "registry:ui" || type === "registry:hook")
)
const legacyNames = new Set<string>(legacyItems.map(({ name }) => name))

function toLegacyMetadata(item: RegistryItem) {
  return {
    name: item.name,
    type: "ui" as const,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies?.filter((name) =>
      legacyNames.has(name)
    )
  }
}

export async function getLegacyIndex() {
  const byName = await getDistributionCatalog()
  return legacyItems.map(({ name }) => {
    const item = byName.get(name)!
    return {
      ...toLegacyMetadata(item),
      files: item.files?.map(({ path }) => path) ?? []
    }
  })
}

export async function getLegacyItem(name: string) {
  const item = await getDistributionItem(name)
  return {
    ...toLegacyMetadata(item),
    files:
      item.files?.map(({ path, content }) => ({
        name: posix.basename(path),
        content: content!
          .replaceAll(/(["'])~\/components\/ui\//g, "$1~/registry/ui/")
          .replaceAll(
            /(["'])~\/(?:hooks\/|lib\/(?!utils["']))/g,
            "$1~/registry/ui/"
          )
      })) ?? []
  }
}
