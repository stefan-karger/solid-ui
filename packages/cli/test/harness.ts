import { stripVTControlCharacters } from "node:util"

import type { RegistryItem } from "@solid-ui/registry/schema"

import { createRegistryClient } from "~/registry/client"
import type { Ui } from "~/utils/ui"

export const UTILS_SOURCE = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

export const UTILITIES_CSS = `/*! Solid UI shared styles */
@custom-variant data-open (&:where([data-open]:not([data-open="false"])));
`

// Registry items for every style, keyed by item name.
export function registryItems(
  extra: Record<string, Partial<RegistryItem>> = {}
): Record<string, RegistryItem> {
  return {
    utils: {
      name: "utils",
      type: "registry:lib",
      dependencies: ["clsx@^2.1.1", "tailwind-merge@^3.7.1"],
      files: [
        { path: "lib/utils.ts", type: "registry:lib", content: UTILS_SOURCE }
      ]
    },
    "style-utilities": {
      name: "style-utilities",
      type: "registry:style",
      dependencies: ["tw-animate-css@^1.4.0"],
      files: [
        {
          path: "lib/style-utilities.css",
          type: "registry:file",
          target: "styles/solid-ui.css",
          content: UTILITIES_CSS
        }
      ]
    },
    ...(extra as Record<string, RegistryItem>)
  }
}

export function fakeRegistry(items = registryItems()) {
  const requests: string[] = []
  const client = createRegistryClient("https://registry.test", async (url) => {
    requests.push(url)
    const match = /\/r\/styles\/([^/]+)\/([^/]+)\.json$/.exec(url)
    const name = match?.[2]
    if (name === "registry")
      return Response.json({
        name: "SolidUI",
        homepage: "https://registry.test",
        items: Object.values(items).map(({ files, ...item }) => ({
          ...item,
          // The catalog lists files without their content.
          files: files?.map(({ path, type, target }) => ({
            path,
            type,
            target
          }))
        }))
      })
    const item = name ? items[name] : undefined
    return item
      ? Response.json(item)
      : new Response("Not found", { status: 404 })
  })
  return { client, requests }
}

export function recordingUi(
  answers: {
    confirm?: boolean | ((message: string) => boolean)
    text?: string
    select?: unknown
  } = {}
) {
  const messages: string[] = []
  // Recorded without colors, so tests read the text.
  const record = (kind: string) => (message: string, title?: string) =>
    messages.push(
      stripVTControlCharacters(
        `${kind}${title ? `(${title})` : ""}: ${message}`
      )
    )
  const ui: Ui = {
    intro: record("intro"),
    outro: record("outro"),
    info: record("info"),
    success: record("success"),
    warn: record("warn"),
    error: record("error"),
    note: record("note"),
    // An answer that isn't one of the options keeps the default.
    select: async (message, options, initial) => {
      messages.push(`select: ${message}`)
      return (
        options.some(({ value }) => value === answers.select)
          ? answers.select
          : initial
      ) as never
    },
    multiselect: async () => (answers.select ?? []) as never,
    text: async (message, initial) => {
      messages.push(`text: ${message}`)
      return answers.text ?? initial
    },
    confirm: async (message) => {
      messages.push(`confirm: ${message}`)
      return typeof answers.confirm === "function"
        ? answers.confirm(message)
        : (answers.confirm ?? false)
    },
    // Records the line a finished step leaves behind.
    task: async (message, run, done) => {
      const result = await run()
      messages.push(stripVTControlCharacters(`task: ${done ?? message}`))
      return result
    }
  }
  return { ui, messages }
}

export function recordingInstaller() {
  const calls: string[][] = []
  return {
    calls,
    install: async (_cwd: string, specs: string[]) => {
      calls.push(specs)
    }
  }
}
