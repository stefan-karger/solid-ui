import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

import {
  applyEdits,
  modify,
  parse,
  type FormattingOptions,
  type ParseError
} from "jsonc-parser"

export type TsConfig = {
  extends?: string | string[]
  files?: string[]
  include?: string[]
  references?: { path: string }[]
  compilerOptions?: {
    baseUrl?: string
    jsxImportSource?: string
    paths?: Record<string, string[]>
  }
}

export type TsConfigFile = {
  // Absolute path of the file.
  path: string
  text: string
  config: TsConfig
}

export const TILDE_ALIAS = "~/*"

export function readTsConfig(file: string): TsConfigFile | null {
  if (!existsSync(file)) return null
  const text = readFileSync(file, "utf8")
  const errors: ParseError[] = []
  const config = parse(text, errors, { allowTrailingComma: true }) as TsConfig
  if (errors.length || typeof config !== "object" || config === null) {
    throw new Error(`Could not parse ${file}.`)
  }
  return { path: file, text, config }
}

function referencedPath(dir: string, reference: string) {
  const target = path.resolve(dir, reference)
  return target.endsWith(".json") ? target : path.join(target, "tsconfig.json")
}

// The tsconfig that compiles the app's source. A solution-style tsconfig.json
// (only references, like Vite's templates) defers to the referenced config
// that includes src, such as tsconfig.app.json.
export function findAppTsConfig(cwd: string): TsConfigFile | null {
  const root = readTsConfig(path.join(cwd, "tsconfig.json"))
  if (!root) return null

  const { references, files, include, compilerOptions } = root.config
  const solutionStyle =
    references?.length &&
    !compilerOptions?.paths &&
    (files?.length === 0 || (!files && !include))
  if (!solutionStyle) return root

  for (const reference of references) {
    const candidate = readTsConfig(referencedPath(cwd, reference.path))
    if (
      candidate?.config.include?.some((entry) => /^(?:\.\/)?src\b/.test(entry))
    )
      return candidate
  }
  return root
}

export function tsPaths(file: TsConfigFile) {
  return file.config.compilerOptions?.paths ?? {}
}

// Resolves an alias such as `~/components/ui` to a directory through the
// tsconfig paths, relative to baseUrl when set and to the tsconfig otherwise.
export function resolveAlias(file: TsConfigFile, alias: string): string | null {
  const dir = path.dirname(file.path)
  const base = path.resolve(dir, file.config.compilerOptions?.baseUrl ?? ".")
  for (const [pattern, targets] of Object.entries(tsPaths(file))) {
    const target = targets[0]
    if (!target) continue
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -1)
      if (alias.startsWith(prefix)) {
        return path.resolve(
          base,
          target.replace("*", alias.slice(prefix.length))
        )
      }
    } else if (pattern === alias) {
      return path.resolve(base, target)
    }
  }
  return null
}

const FORMATTING: FormattingOptions = {
  insertSpaces: true,
  tabSize: 2,
  eol: "\n"
}

// Adds `"~/*": ["./src/*"]` to compilerOptions.paths and keeps the comments
// and formatting of the rest of the file. TypeScript 7 drops baseUrl, so the
// target is relative to the tsconfig.
export function addTildeAlias(file: TsConfigFile, target: string): string {
  const indent = file.text.match(/\n( +|\t)"/)?.[1]
  const formattingOptions: FormattingOptions = indent?.startsWith("\t")
    ? { ...FORMATTING, insertSpaces: false }
    : { ...FORMATTING, tabSize: indent?.length ?? 2 }
  const eol = file.text.includes("\r\n") ? "\r\n" : "\n"
  return applyEdits(
    file.text,
    modify(file.text, ["compilerOptions", "paths", TILDE_ALIAS], [target], {
      formattingOptions: { ...formattingOptions, eol }
    })
  )
}
