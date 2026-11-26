import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

import { parse } from "@babel/parser"
import type { Expression, Node, ObjectExpression, Program } from "@babel/types"

const CONFIG_NAMES = [
  "vite.config.ts",
  "vite.config.mts",
  "vite.config.js",
  "vite.config.mjs",
  "vite.config.cts",
  "vite.config.cjs"
]

export const TSCONFIG_PATHS_ENTRY = "resolve: { tsconfigPaths: true }"

export const TSCONFIG_PATHS_SNIPPET = `export default defineConfig({
  ${TSCONFIG_PATHS_ENTRY},
  plugins: [solid(), tailwindcss()]
})`

export function findViteConfig(cwd: string): string | null {
  for (const name of CONFIG_NAMES) {
    const file = path.join(cwd, name)
    if (existsSync(file)) return file
  }
  return null
}

// What init has to do so Vite resolves the import alias through the tsconfig paths.
export type ViteAliasPlan =
  // The config already resolves the import alias.
  | { kind: "resolved" }
  // `text` is the config with resolve.tsconfigPaths set to true; `enable`
  // means the config had it set to false.
  | { kind: "patch"; text: string; enable: boolean }
  // init can't change the config safely, so the user adds the option.
  | { kind: "manual"; reason: string }

export type ViteConfig = { path: string; text: string; plan: ViteAliasPlan }

export function readViteConfig(cwd: string, prefix = "~"): ViteConfig | null {
  const file = findViteConfig(cwd)
  if (!file) return null
  const text = readFileSync(file, "utf8")
  return { path: file, text, plan: planViteAlias(text, file, prefix) }
}

type Property = ObjectExpression["properties"][number]

function manual(reason: string): ViteAliasPlan {
  return { kind: "manual", reason }
}

// Peels `x satisfies T`, `x as T`, `<T>x`, `x!` and parentheses down to `x`.
function unwrap(node: Node | null | undefined): Node | null | undefined {
  while (
    node &&
    (node.type === "TSSatisfiesExpression" ||
      node.type === "TSAsExpression" ||
      node.type === "TSTypeAssertion" ||
      node.type === "TSNonNullExpression" ||
      node.type === "ParenthesizedExpression")
  )
    node = node.expression
  return node
}

function keyName(property: Property) {
  if (property.type === "SpreadElement" || property.computed) return undefined
  const { key } = property
  if (key.type === "Identifier") return key.name
  if (key.type === "StringLiteral") return key.value
  return undefined
}

function findProperty(object: ObjectExpression, name: string) {
  return object.properties.find((property) => keyName(property) === name)
}

// The value of a plain `name: value` property.
function propertyValue(object: ObjectExpression, name: string) {
  const property = findProperty(object, name)
  return property?.type === "ObjectProperty"
    ? unwrap(property.value)
    : undefined
}

function hasSpread(object: ObjectExpression) {
  return object.properties.some((property) => property.type === "SpreadElement")
}

// The value a top-level `const name = …` binds.
function findBinding(program: Program, name: string) {
  for (const statement of program.body) {
    if (statement.type !== "VariableDeclaration") continue
    for (const declarator of statement.declarations)
      if (declarator.id.type === "Identifier" && declarator.id.name === name)
        return unwrap(declarator.init)
  }
  return undefined
}

// The config object behind `export default`: a literal, defineConfig({...}),
// defineConfig(() => ({...})), or a top-level const holding one of these.
function findConfigObject(program: Program): ObjectExpression | string {
  const exported = program.body.find(
    (statement) => statement.type === "ExportDefaultDeclaration"
  )
  if (!exported) return "it has no export default"

  let node = unwrap(exported.declaration as Expression)
  for (let depth = 0; node && depth < 5; depth++) {
    if (node.type === "ObjectExpression") return node
    if (node.type === "Identifier") {
      node = findBinding(program, node.name)
      continue
    }
    if (node.type === "CallExpression") {
      const { callee } = node
      if (callee.type !== "Identifier" || callee.name !== "defineConfig")
        return `its export default calls ${callee.type === "Identifier" ? callee.name : "a function"} instead of defineConfig`
      node = unwrap(node.arguments[0] as Expression | undefined)
      continue
    }
    if (
      node.type === "ArrowFunctionExpression" ||
      node.type === "FunctionExpression"
    ) {
      if (node.body.type !== "BlockStatement") {
        node = unwrap(node.body)
        continue
      }
      const returns = node.body.body.filter(
        (statement) => statement.type === "ReturnStatement"
      )
      if (returns.length !== 1)
        return "its config function doesn't return a single object"
      node = unwrap(returns[0]!.argument)
      continue
    }
    break
  }
  return "its export default is not a config object"
}

function isPrefix(node: Node | null | undefined, prefix: string) {
  node = unwrap(node)
  if (node?.type === "StringLiteral")
    return node.value === prefix || node.value === `${prefix}/`
  if (node?.type === "RegExpLiteral")
    return node.pattern.startsWith(`^${prefix}`)
  return false
}

// An alias for the prefix in resolve.alias, as an object or a list of { find }.
function aliasesPrefix(resolve: ObjectExpression, prefix: string) {
  const alias = propertyValue(resolve, "alias")
  if (alias?.type === "ObjectExpression")
    return alias.properties.some((property) =>
      [prefix, `${prefix}/`].includes(keyName(property) ?? "")
    )
  if (alias?.type === "ArrayExpression")
    return alias.elements.some((element) => {
      const entry = unwrap(element)
      return (
        entry?.type === "ObjectExpression" &&
        isPrefix(propertyValue(entry, "find"), prefix)
      )
    })
  return false
}

// The vite-tsconfig-paths plugin, under the name it is imported as.
function usesTsconfigPathsPlugin(program: Program, config: ObjectExpression) {
  const names = new Set(["tsconfigPaths"])
  for (const statement of program.body)
    if (
      statement.type === "ImportDeclaration" &&
      statement.source.value === "vite-tsconfig-paths"
    )
      for (const specifier of statement.specifiers)
        names.add(specifier.local.name)

  const plugins = propertyValue(config, "plugins")
  if (plugins?.type !== "ArrayExpression") return false
  return plugins.elements.some((element) => {
    const call = unwrap(element)
    return (
      call?.type === "CallExpression" &&
      call.callee.type === "Identifier" &&
      names.has(call.callee.name)
    )
  })
}

function splice(text: string, start: number, insert: string, end = start) {
  return text.slice(0, start) + insert + text.slice(end)
}

function lineIndent(text: string, offset: number) {
  const lineStart = text.lastIndexOf("\n", offset - 1) + 1
  return /^[ \t]*/.exec(text.slice(lineStart))![0]
}

// Where a property's text starts, including the comments above it.
function propertyStart(property: Node) {
  return Math.min(
    property.start!,
    ...(property.leadingComments ?? []).map((comment) => comment.start!)
  )
}

// Inserts `entry` as the first property of `object`, in the object's layout.
function insertFirst(text: string, object: ObjectExpression, entry: string) {
  const first = object.properties[0]
  if (!first) {
    const inner = text.slice(object.start! + 1, object.end! - 1)
    return inner.trim()
      ? // Only comments inside; they stay after the new entry.
        splice(text, object.start! + 1, ` ${entry},${inner}`, object.end! - 1)
      : splice(text, object.start!, `{ ${entry} }`, object.end!)
  }
  const start = propertyStart(first)
  const multiline = text.slice(object.start!, start).includes("\n")
  const newline = text.includes("\r\n") ? "\r\n" : "\n"
  return splice(
    text,
    start,
    multiline ? `${entry},${newline}${lineIndent(text, start)}` : `${entry}, `
  )
}

// How to make the Vite config resolve the import alias through the tsconfig paths, as
// text edits that keep the file's formatting and comments.
export function planViteAlias(
  text: string,
  file = "vite.config.ts",
  prefix = "~"
): ViteAliasPlan {
  let program: Program
  try {
    program = parse(text, {
      sourceType: "module",
      plugins: /\.[cm]?ts$/.test(file) ? ["typescript"] : []
    }).program
  } catch {
    return manual("init could not parse it")
  }

  const config = findConfigObject(program)
  if (typeof config === "string") return manual(config)
  if (usesTsconfigPathsPlugin(program, config)) return { kind: "resolved" }

  if (!findProperty(config, "resolve")) {
    // A spread may already carry a resolve block that a new one would hide.
    if (hasSpread(config)) return manual("its config spreads other options")
    return {
      kind: "patch",
      enable: false,
      text: insertFirst(text, config, TSCONFIG_PATHS_ENTRY)
    }
  }

  const resolve = propertyValue(config, "resolve")
  if (resolve?.type !== "ObjectExpression")
    return manual("its resolve option is not an object literal")
  if (aliasesPrefix(resolve, prefix)) return { kind: "resolved" }

  if (!findProperty(resolve, "tsconfigPaths")) {
    if (hasSpread(resolve))
      return manual("its resolve option spreads other options")
    return {
      kind: "patch",
      enable: false,
      text: insertFirst(text, resolve, "tsconfigPaths: true")
    }
  }

  const flag = propertyValue(resolve, "tsconfigPaths")
  if (flag?.type !== "BooleanLiteral")
    return manual("its resolve.tsconfigPaths is not true or false")
  if (flag.value) return { kind: "resolved" }
  return {
    kind: "patch",
    enable: true,
    text: splice(text, flag.start!, "true", flag.end!)
  }
}
