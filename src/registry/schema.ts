import * as v from "valibot";

export const registryTypeSchema = v.picklist([
  "ui",
  "example",
  "block",
  "page",
  "component",
]);

export const registryFileSchema = v.object({
  content: v.optional(v.string()),
  path: v.string(),
  target: v.optional(v.string()),
  type: registryTypeSchema,
});

export const registryItemSchema = v.object({
  dependencies: v.optional(v.array(v.string())),
  description: v.optional(v.string()),
  files: v.array(registryFileSchema),
  name: v.string(),
  registryDependencies: v.optional(v.array(v.string())),
  type: registryTypeSchema,
});

export const registryIndexSchema = v.record(
  v.string(),
  v.object({ ...registryItemSchema.entries, component: v.any() }),
);

export const registrySchema = v.array(registryItemSchema);

export type RegistryItem = v.InferOutput<typeof registryItemSchema>;
export type RegistryIndex = v.InferOutput<typeof registryIndexSchema>;
export type Registry = v.InferOutput<typeof registrySchema>;
