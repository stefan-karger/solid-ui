import { z } from "zod"

import directoryData from "~/data/registry-directory.json"

const httpsUrl = z.url().refine((value) => new URL(value).protocol === "https:", "must use HTTPS")

const logoUrl = z
  .string()
  .trim()
  .refine((value) => {
    if (value.startsWith("/") && !value.startsWith("//")) return true

    try {
      return new URL(value).protocol === "https:"
    } catch {
      return false
    }
  }, "must be a public-root path or HTTPS URL")

export const registryDirectoryEntrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a route-safe lowercase name"),
  description: z.string().trim().min(1),
  homepage: httpsUrl,
  registryUrl: httpsUrl,
  logo: logoUrl.optional(),
  tags: z
    .array(
      z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase")
    )
    .refine((tags) => new Set(tags).size === tags.length, "must contain unique values")
    .optional()
})

export type RegistryDirectoryEntry = z.infer<typeof registryDirectoryEntrySchema>

export function parseRegistryDirectory(input: unknown): readonly RegistryDirectoryEntry[] {
  const entries = z.array(registryDirectoryEntrySchema).parse(input)
  const names = new Set<string>()

  for (const entry of entries) {
    if (names.has(entry.name)) {
      throw new Error(`Duplicate registry directory entry: ${entry.name}`)
    }
    names.add(entry.name)
  }

  return entries.toSorted((left, right) => left.name.localeCompare(right.name))
}

export const registryDirectoryEntries = parseRegistryDirectory(directoryData)
