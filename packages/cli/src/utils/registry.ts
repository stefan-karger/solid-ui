import * as v from "valibot"

const DEFAULT_BASE_URL = "https://www.solid-ui.com"

// Lets the CLI run against a local docs server or a preview deploy.
const BASE_URL = (
  process.env.SOLID_UI_REGISTRY_URL?.trim() || DEFAULT_BASE_URL
).replace(/\/+$/, "")

export const RegistryIndexSchema = v.array(
  v.object({
    name: v.string(),
    dependencies: v.optional(v.array(v.string())),
    registryDependencies: v.optional(v.array(v.string())),
    files: v.array(v.string()),
    type: v.picklist(["ui", "example"])
  })
)

export type RegistryIndex = v.InferOutput<typeof RegistryIndexSchema>

export const RegistryItemSchema = v.object({
  name: v.string(),
  dependencies: v.optional(v.array(v.string())),
  files: v.array(
    v.object({
      name: v.string(),
      content: v.string()
    })
  ),
  type: v.picklist(["ui", "example"])
})

export type RegistryItem = v.InferOutput<typeof RegistryItemSchema>

async function fetchRegistry(paths: string[]) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${BASE_URL}/registry/${path}`)
        return await response.json()
      })
    )
    return results
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch registry from ${BASE_URL}.`, {
      cause: error
    })
  }
}

export async function getRegistryIndex() {
  try {
    const [result] = await fetchRegistry(["index.json"])
    return v
      .parse(RegistryIndexSchema, result)
      .filter((item) => item.type === "ui")
  } catch (error) {
    throw new Error(`Failed to fetch components from registry.`, {
      cause: error
    })
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

  // filter out duplicates
  return tree.filter(
    (component, idx, self) =>
      self.findIndex((c) => c.name === component.name) === idx
  )
}

export async function fetchTree(tree: RegistryIndex) {
  try {
    const paths = tree.map((item) => `ui/${item.name}.json`)
    const results = await fetchRegistry(paths)

    return v.parse(v.array(RegistryItemSchema), results)
  } catch (error) {
    throw new Error(`Failed to fetch components from registry.`, {
      cause: error
    })
  }
}
