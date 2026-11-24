import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { posix } from "node:path"

import ts from "typescript"

import manifest from "../package.json" with { type: "json" }
import { styles, type DocsStyle } from "../src/lib/appearance.ts"
import {
  ACTIVE_REGISTRY_STYLE,
  normalizeRegistryPath,
  prepareRegistrySource
} from "../src/lib/registry-source.ts"
import { registry } from "../src/registry/index.ts"
import { registrySchema, type RegistryItem } from "../src/registry/schema.ts"

const installableTypes = new Set<RegistryItem["type"]>([
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:style",
  "registry:component",
  "registry:block"
])
const ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json"
const installedDependencies = manifest.dependencies
const { name: registryName, homepage, items } = registrySchema.parse(registry)
const names = new Set<string>()
const owners = new Map<string, string>()
for (const item of items) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.name) || names.has(item.name)) {
    throw new Error(`[registry] Invalid or duplicate item name "${item.name}"`)
  }
  names.add(item.name)
  for (const { path } of item.files ?? []) {
    owners.set(
      normalizeRegistryPath(path, item.name).replace(/\.[^.]+$/, ""),
      item.name
    )
  }
}

const registryDir = new URL("../src/registry/", import.meta.url)
const sources = new Map<string, Promise<string>>()
function readSource(path: string) {
  let source = sources.get(path)
  if (!source) {
    source = readFile(new URL(path, registryDir), "utf8")
    sources.set(path, source)
  }
  return source
}

async function prepareFiles(item: RegistryItem, styleName: DocsStyle) {
  const styleCss = await readSource(`styles/style-${styleName}.css`)
  return Promise.all(
    (item.files ?? []).map(async (file) => {
      const registryPath = normalizeRegistryPath(file.path, item.name)
      const { code } = await prepareRegistrySource(
        await readSource(registryPath),
        {
          registryPath,
          styleName,
          styleCss,
          ...(file.target ? { target: file.target } : {})
        }
      )
      return { ...file, content: code }
    })
  )
}

async function prepareItem(item: RegistryItem) {
  const files = await prepareFiles(item, ACTIVE_REGISTRY_STYLE)
  const packages = new Set(item.dependencies ?? [])
  const registryDependencies = new Set(item.registryDependencies ?? [])

  for (const file of files) {
    if (!/\.[jt]sx?$/.test(file.path)) continue
    for (const { fileName } of ts.preProcessFile(file.content, true, true)
      .importedFiles) {
      if (fileName.startsWith("~/") || fileName.startsWith(".")) {
        const path = fileName.startsWith(".")
          ? posix.join(posix.dirname(file.path), fileName)
          : fileName
              .replace(/^~\/components\/ui\//, "ui/")
              .replace(/^~\/(?=components\/|lib\/|hooks\/)/, "")
        const owner = owners.get(path.replace(/\.(?:tsx?|jsx?)$/, ""))
        if (!owner)
          throw new Error(
            `[registry] ${file.path} imports an unpublished file: ${fileName}`
          )
        if (owner !== item.name) registryDependencies.add(owner)
      } else if (!fileName.startsWith("node:")) {
        packages.add(
          fileName
            .split("/")
            .slice(0, fileName.startsWith("@") ? 2 : 1)
            .join("/")
        )
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

const catalog = await Promise.all(items.map(prepareItem))
const byName = new Map(catalog.map((item) => [item.name, item]))
const visiting = new Set<string>()
const visited = new Set<string>()
function visit(name: string) {
  if (visited.has(name)) return
  if (visiting.has(name))
    throw new Error(`[registry] Dependency cycle at "${name}"`)
  const item = byName.get(name)
  if (!item) throw new Error(`[registry] No item named "${name}"`)
  visiting.add(name)
  for (const dependency of item.registryDependencies) visit(dependency)
  visiting.delete(name)
  visited.add(name)
}
for (const name of byName.keys()) visit(name)

const installable = catalog.filter(({ type }) => installableTypes.has(type))
function withFileMetadata(item: (typeof catalog)[number]) {
  return {
    ...item,
    files: item.files.map(({ path, type, target }) => ({ path, type, target }))
  }
}

// Mirrors shadcn's apps/v4 public/r layout. index.json lists the installable
// items. styles/<style> holds every item, including examples, and the
// registry.json catalog for that style.
const modernFiles = new Map<string, unknown>([
  ["index.json", installable.map(withFileMetadata)],
  [
    "styles/index.json",
    styles.map((name) => ({
      name,
      label: `${name[0]!.toUpperCase()}${name.slice(1)}`
    }))
  ]
])
for (const style of styles) {
  modernFiles.set(`styles/${style}/registry.json`, {
    name: registryName,
    homepage,
    items: catalog.map(withFileMetadata)
  })
  for (const item of catalog) {
    const files =
      style === ACTIVE_REGISTRY_STYLE
        ? item.files
        : await prepareFiles(item, style)
    modernFiles.set(`styles/${style}/${item.name}.json`, {
      $schema: ITEM_SCHEMA,
      ...item,
      files
    })
  }
}

// The published CLI installs TypeScript files into its configured component directory.
const legacyItems = installable.filter(
  ({ type, name }) =>
    name !== "utils" && (type === "registry:ui" || type === "registry:hook")
)
const legacyNames = new Set(legacyItems.map(({ name }) => name))
const legacyFiles = new Map<string, unknown>()
const legacyIndex = legacyItems.map((item) => {
  const metadata = {
    name: item.name,
    type: "ui",
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies.filter((name) =>
      legacyNames.has(name)
    )
  }
  legacyFiles.set(`ui/${item.name}.json`, {
    ...metadata,
    files: item.files.map(({ path, content }) => ({
      name: posix.basename(path),
      content: content
        .replaceAll(/(["'])~\/components\/ui\//g, "$1~/registry/ui/")
        .replaceAll(
          /(["'])~\/(?:hooks\/|lib\/(?!utils["']))/g,
          "$1~/registry/ui/"
        )
    }))
  })
  return { ...metadata, files: item.files.map(({ path }) => path) }
})
legacyFiles.set("index.json", legacyIndex)

async function writeRegistry(
  folder: "r" | "registry",
  files: Map<string, unknown>
) {
  const directory = new URL(`../public/${folder}/`, import.meta.url)
  await rm(directory, { recursive: true, force: true })
  const parents = new Set([...files.keys()].map((file) => posix.dirname(file)))
  await Promise.all(
    [...parents].map((parent) =>
      mkdir(new URL(`${parent}/`, directory), { recursive: true })
    )
  )
  for (const [path, payload] of files) {
    await writeFile(new URL(path, directory), JSON.stringify(payload))
  }
}

await Promise.all([
  writeRegistry("r", modernFiles),
  writeRegistry("registry", legacyFiles)
])
console.log(
  `Registry built: ${modernFiles.size} files in public/r and ${legacyFiles.size} files in public/registry.`
)
