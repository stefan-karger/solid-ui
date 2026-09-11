import { z } from "zod"

import { registry } from "~/registry"
import {
  registrySchema,
  type Registry,
  type RegistryItem,
  type RegistryItemFile
} from "~/registry/schema"

import {
  ACTIVE_REGISTRY_STYLE,
  prepareRegistrySource,
  type PreparedRegistrySource
} from "./registry-source"

const rawRegistryFileLoaders = import.meta.glob<string>(
  "../registry/**/*.{ts,tsx,js,jsx,css,json}",
  {
    query: "?raw",
    import: "default"
  }
)

const rawRegistryFiles = Object.fromEntries(
  Object.entries(rawRegistryFileLoaders).map(([path, loader]) => [
    path.replace(/^\.\.\/registry\//, "/src/registry/"),
    loader
  ])
)

const registryDocsMetaSchema = z
  .object({
    previewEntry: z.string().optional(),
    clientOnly: z.boolean().optional(),
    blockPreview: z.boolean().optional()
  })
  .strict()
  .optional()

const previewTypes = new Set(["registry:example", "registry:component", "registry:block"])
const previewRootByType = {
  "registry:example": "examples/",
  "registry:component": "components/",
  "registry:block": "blocks/"
} as const

export type PreviewDescriptor = {
  name: string
  type: "registry:example" | "registry:component" | "registry:block"
  moduleId: string
  filePath: string
  clientOnly: boolean
  blockPreview: boolean
}

export function normalizeRegistryPath(path: string, itemName = "unknown"): string {
  if (!path || /^[a-zA-Z]:[\\/]/.test(path) || path.startsWith("/") || path.startsWith("\\")) {
    throw new Error(
      `[registry] Item "${itemName}" has an invalid absolute or empty path: "${path}"`
    )
  }

  const normalized = path.replaceAll("\\", "/")
  const segments = normalized.split("/")
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) {
    throw new Error(`[registry] Item "${itemName}" has an invalid path segment: "${path}"`)
  }
  return normalized
}

export function toRegistryModuleId(path: string, itemName?: string): string {
  return `/src/registry/${normalizeRegistryPath(path, itemName)}`
}

function readDocsMeta(item: RegistryItem) {
  const result = registryDocsMetaSchema.safeParse(item.meta?.docs)
  if (!result.success) {
    throw new Error(
      `[registry] Item "${item.name}" has invalid meta.docs: ${z.prettifyError(result.error)}`
    )
  }
  return result.data
}

export function validateRegistryCatalog(
  input: Registry,
  availableModuleIds: ReadonlySet<string>
): Map<string, RegistryItem> {
  const parsed = registrySchema.parse(input)
  const items = new Map<string, RegistryItem>()

  for (const item of parsed.items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.name)) {
      throw new Error(`[registry] Item name "${item.name}" is not route-safe`)
    }
    if (items.has(item.name)) {
      throw new Error(`[registry] Duplicate item name "${item.name}"`)
    }

    const docsMeta = readDocsMeta(item)
    for (const file of item.files ?? []) {
      const moduleId = toRegistryModuleId(file.path, item.name)
      if (!availableModuleIds.has(moduleId)) {
        throw new Error(
          `[registry] Item "${item.name}" declares missing file "${file.path}" (expected ${moduleId})`
        )
      }
    }

    if (
      docsMeta?.previewEntry &&
      !item.files?.some((file) => file.path === docsMeta.previewEntry)
    ) {
      throw new Error(
        `[registry] Item "${item.name}" meta.docs.previewEntry "${docsMeta.previewEntry}" is not a declared file`
      )
    }
    if (docsMeta?.clientOnly !== undefined && !previewTypes.has(item.type)) {
      throw new Error(`[registry] Item "${item.name}" uses clientOnly but is not previewable`)
    }
    if (docsMeta?.blockPreview !== undefined && !previewTypes.has(item.type)) {
      throw new Error(`[registry] Item "${item.name}" uses blockPreview but is not previewable`)
    }
    items.set(item.name, item)
  }

  return items
}

const availableModuleIds = new Set(Object.keys(rawRegistryFiles))
const registryItems = validateRegistryCatalog(registrySchema.parse(registry), availableModuleIds)
const preparedSourceCache = new Map<string, Promise<PreparedRegistrySource>>()
const styleSourceCache = new Map<string, Promise<string>>()

export function getRegistryItem(name: string): RegistryItem {
  const item = registryItems.get(name)
  if (!item) throw new Error(`[registry] Unknown registry item "${name}"`)
  return item
}

export function getRegistryFile(name: string, file?: string): RegistryItemFile {
  const item = getRegistryItem(name)
  const files = item.files ?? []
  if (!files.length) throw new Error(`[registry] Item "${name}" does not declare any files`)

  if (!file) return files[0]!
  const selected = files.find((candidate) => candidate.path === file)
  if (!selected) {
    throw new Error(
      `[registry] Item "${name}" does not declare file "${file}". Expected one of: ${files.map((candidate) => candidate.path).join(", ")}`
    )
  }
  return selected
}

export function resolvePreview(name: string): PreviewDescriptor {
  const item = getRegistryItem(name)
  if (!previewTypes.has(item.type)) {
    throw new Error(
      `[registry] ComponentPreview "${name}" has type "${item.type}" and cannot be previewed directly. Add a registry:example entry such as "${name}-demo".`
    )
  }

  const type = item.type as PreviewDescriptor["type"]
  const docsMeta = readDocsMeta(item)
  const file = getRegistryFile(name, docsMeta?.previewEntry)
  const normalizedPath = normalizeRegistryPath(file.path, name)
  const expectedRoot = previewRootByType[type]
  if (!normalizedPath.startsWith(expectedRoot)) {
    throw new Error(
      `[registry] Preview "${name}" has type "${type}" but entry "${file.path}" is not under ${expectedRoot}`
    )
  }
  if (!/\.(?:tsx|jsx)$/.test(normalizedPath)) {
    throw new Error(`[registry] Preview "${name}" entry "${file.path}" must be a .tsx or .jsx file`)
  }

  return {
    name,
    type,
    moduleId: toRegistryModuleId(normalizedPath, name),
    filePath: file.path,
    clientOnly: docsMeta?.clientOnly ?? false,
    blockPreview: type === "registry:block" || (docsMeta?.blockPreview ?? false)
  }
}

export function getBlockPreviews(): PreviewDescriptor[] {
  return [...registryItems.values()]
    .filter((item) => previewTypes.has(item.type))
    .map((item) => resolvePreview(item.name))
    .filter((descriptor) => descriptor.blockPreview)
}

async function loadRawModule(moduleId: string, context: string): Promise<string> {
  const loader = rawRegistryFiles[moduleId]
  if (!loader)
    throw new Error(`[registry] Missing source module for ${context} (expected ${moduleId})`)
  return loader()
}

function getStyleSource(styleName: string): Promise<string> {
  const cached = styleSourceCache.get(styleName)
  if (cached) return cached
  const moduleId = `/src/registry/styles/style-${styleName}.css`
  const source = loadRawModule(moduleId, `style "${styleName}"`)
  styleSourceCache.set(styleName, source)
  return source
}

export async function getRegistrySource(options: {
  name: string
  file?: string
  styleName?: string
}): Promise<PreparedRegistrySource> {
  const selected = getRegistryFile(options.name, options.file)
  const moduleId = toRegistryModuleId(selected.path, options.name)
  const styleName = options.styleName ?? ACTIVE_REGISTRY_STYLE
  const cacheKey = `${moduleId}\0${styleName}`
  const cached = preparedSourceCache.get(cacheKey)
  if (cached) return cached

  const prepared = Promise.all([
    loadRawModule(moduleId, `item "${options.name}" file "${selected.path}"`),
    getStyleSource(styleName)
  ]).then(([raw, styleCss]) =>
    prepareRegistrySource(raw, {
      registryPath: normalizeRegistryPath(selected.path, options.name),
      ...(selected.target ? { target: selected.target } : {}),
      styleName,
      styleCss
    })
  )
  preparedSourceCache.set(cacheKey, prepared)
  return prepared
}
