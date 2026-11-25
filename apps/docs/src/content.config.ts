import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const docs = defineCollection({
  loader: glob({
    base: "./src/content/docs",
    pattern: "**/*.{md,mdx}"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    component: z.boolean().optional(),
    new: z.boolean().optional()
  })
})

export const collections = { docs }
