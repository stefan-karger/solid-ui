import { z } from "zod"

import { isPresetCode, presetOptions } from "./preset/codec.ts"
import { styles } from "./styles.ts"

export const CONFIG_FILE = "components.json"
export const LEGACY_CONFIG_FILE = "ui.config.json"
export const CONFIG_SCHEMA_URL = "https://solid-ui.com/schema.json"

// The import alias prefix: `~` gives `~/components`, `~/lib/utils` and so on.
export const DEFAULT_ALIAS = "~"

export function aliasesFor(prefix: string) {
  return {
    components: `${prefix}/components`,
    ui: `${prefix}/components/ui`,
    lib: `${prefix}/lib`,
    utils: `${prefix}/lib/utils`,
    hooks: `${prefix}/hooks`
  }
}

export const DEFAULT_ALIASES = aliasesFor(DEFAULT_ALIAS)

// components.json for solidui-cli 1.x. It follows shadcn/ui's file without
// the React, Tailwind 3 and icon options; see plans and the CLI docs.
export const componentsJsonSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.enum(styles),
    // Normalized preset code; solid-ui.css is generated from it.
    preset: z.string().refine(isPresetCode, "Expected a preset code like b0"),
    tailwind: z
      .object({
        // The app stylesheet with `@import "tailwindcss"`. solid-ui.css sits
        // next to it.
        css: z.string().min(1)
      })
      .strict(),
    menuColor: z.enum(presetOptions.menuColor).default("default"),
    menuAccent: z.enum(presetOptions.menuAccent).default("subtle"),
    aliases: z
      .object({
        components: z.string().default(DEFAULT_ALIASES.components),
        ui: z.string().default(DEFAULT_ALIASES.ui),
        lib: z.string().default(DEFAULT_ALIASES.lib),
        utils: z.string().default(DEFAULT_ALIASES.utils),
        hooks: z.string().default(DEFAULT_ALIASES.hooks)
      })
      .strict()
      .default(DEFAULT_ALIASES)
  })
  .strict()

export type ComponentsJson = z.output<typeof componentsJsonSchema>

export function componentsJsonJsonSchema() {
  return z.toJSONSchema(componentsJsonSchema, { io: "input" })
}
