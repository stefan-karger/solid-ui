import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

import type { ComponentsJson } from "@solid-ui/registry/config"
import type { RegistryItemFile } from "@solid-ui/registry/schema"

import { resolveAlias, type TsConfigFile } from "~/project/tsconfig"
import { CliError } from "~/utils/errors"

export type PlannedFile = {
  // Absolute target path.
  path: string
  content: string
}

export type WriteResult = {
  created: string[]
  updated: string[]
  skipped: string[]
}

const FOLDERS: Partial<
  Record<RegistryItemFile["type"], [string, keyof ComponentsJson["aliases"]]>
> = {
  "registry:ui": ["ui/", "ui"],
  "registry:lib": ["lib/", "lib"],
  "registry:hook": ["hooks/", "hooks"],
  "registry:component": ["components/", "components"],
  "registry:block": ["components/", "components"]
}

function inside(root: string, target: string) {
  const relative = path.relative(root, target)
  return !!relative && !relative.startsWith("..") && !path.isAbsolute(relative)
}

// Where a registry file goes: the alias folder for its type, or its target
// relative to the project root.
export function resolveTargetPath(
  file: Pick<RegistryItemFile, "path" | "type" | "target">,
  config: Pick<ComponentsJson, "aliases">,
  tsconfig: TsConfigFile,
  cwd: string
) {
  let target: string
  const folder = FOLDERS[file.type]
  if (file.target) {
    target = path.resolve(cwd, file.target)
  } else if (folder) {
    const [prefix, alias] = folder
    const dir = resolveAlias(tsconfig, config.aliases[alias])
    if (!dir)
      throw new CliError(
        `${path.basename(tsconfig.path)} has no path for the ${alias} alias ${config.aliases[alias]}.`
      )
    const relative = file.path.startsWith(prefix)
      ? file.path.slice(prefix.length)
      : path.posix.basename(file.path)
    target = path.resolve(dir, relative)
  } else {
    throw new CliError(`Can't place ${file.path} (${file.type}).`)
  }
  if (!inside(cwd, target))
    throw new CliError(`${file.path} would be written outside the project.`)
  return target
}

const normalize = (text: string) => text.replace(/\r\n?/g, "\n").trimEnd()

// Writes the files. Identical files are skipped; a different one is replaced
// when overwrite allows it, else when `confirm` agrees.
export async function writeFiles(
  files: PlannedFile[],
  cwd: string,
  options: {
    overwrite: boolean
    confirm?: (relativePath: string) => Promise<boolean>
  }
): Promise<WriteResult> {
  const result: WriteResult = { created: [], updated: [], skipped: [] }
  for (const file of files) {
    const relative = path.relative(cwd, file.path).split(path.sep).join("/")
    const content = `${normalize(file.content)}\n`
    if (existsSync(file.path)) {
      if (normalize(readFileSync(file.path, "utf8")) === normalize(content)) {
        result.skipped.push(relative)
        continue
      }
      const replace =
        options.overwrite || ((await options.confirm?.(relative)) ?? false)
      if (!replace) {
        result.skipped.push(relative)
        continue
      }
      writeFileSync(file.path, content)
      result.updated.push(relative)
    } else {
      mkdirSync(path.dirname(file.path), { recursive: true })
      writeFileSync(file.path, content)
      result.created.push(relative)
    }
  }
  return result
}
