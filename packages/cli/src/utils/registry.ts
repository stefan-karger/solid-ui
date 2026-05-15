import * as v from "valibot"

export function getRegistryBaseUrl() {
  const fromEnv = process.env.SOLIDUI_REGISTRY_URL?.replace(/\/$/, "")
  return fromEnv ?? "https://www.solid-ui.com"
}

export const RegistryIndexSchema = v.array(
  v.object({
    name: v.string(),
    dependencies: v.optional(v.array(v.string())),
    registryDependencies: v.optional(v.array(v.string())),
    files: v.optional(v.array(v.string())),
    type: v.picklist(["ui", "block", "example"])
  })
)

export type RegistryIndex = v.InferOutput<typeof RegistryIndexSchema>

export const RegistryItemFileSchema = v.object({
  name: v.string(),
  content: v.string(),
  target: v.optional(v.string())
})

export const RegistryItemSchema = v.object({
  name: v.string(),
  dependencies: v.optional(v.array(v.string())),
  registryDependencies: v.optional(v.array(v.string())),
  files: v.array(RegistryItemFileSchema),
  type: v.picklist(["ui", "block", "example"])
})

export type RegistryItem = v.InferOutput<typeof RegistryItemSchema>

async function fetchRegistry(paths: string[]) {
  const baseUrl = getRegistryBaseUrl()
  try {
    const results = await Promise.all(
      paths.map(async (registryPath) => {
        const response = await fetch(`${baseUrl}/registry/${registryPath}`)
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        return await response.json()
      })
    )
    return results
  } catch (e) {
    console.log(e)
    throw new Error(`Failed to fetch registry from ${baseUrl}.`)
  }
}

export async function getRegistryIndex(kind: "ui" | "block" = "ui") {
  try {
    const indexPath = kind === "ui" ? "index.json" : "blocks/index.json"
    const [result] = await fetchRegistry([indexPath])
    const parsed = v.parse(RegistryIndexSchema, result)
    return parsed.filter((item) => item.type === kind)
  } catch (e) {
    throw new Error(`Failed to fetch ${kind} components from registry.`)
  }
}

export async function resolveTree(index: RegistryIndex, names: string[]) {
  const tree: RegistryIndex = []

  for (const name of names) {
    const entry = index.find((entry) => entry.name === name)
    if (!entry) {
      continue
    }

    tree.push(entry)

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies)
      tree.push(...dependencies)
    }
  }

  return tree.filter(
    (component, idx, self) => self.findIndex((c) => c.name === component.name) === idx
  )
}

export async function fetchRegistryItems(tree: RegistryIndex, kind: "ui" | "block") {
  try {
    const prefix = kind === "ui" ? "ui" : "block"
    const paths = tree.map((item) => `${prefix}/${item.name}.json`)
    const results = await fetchRegistry(paths)

    return v.parse(v.array(RegistryItemSchema), results)
  } catch (e) {
    throw new Error(`Failed to fetch components from registry.`)
  }
}
