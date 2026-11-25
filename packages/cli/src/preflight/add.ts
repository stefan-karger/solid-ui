import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

import {
  CONFIG_FILE,
  componentsJsonSchema,
  LEGACY_CONFIG_FILE,
  type ComponentsJson
} from "@solid-ui/registry/config"

import { LEGACY_CLI_VERSION } from "~/constants"
import { findAppTsConfig, type TsConfigFile } from "~/project/tsconfig"
import { CliError } from "~/utils/errors"
import { CLI_NAME } from "~/utils/version"

export type AddProject = {
  cwd: string
  config: ComponentsJson
  tsconfig: TsConfigFile
}

// add relies on what init set up: a valid components.json and a tsconfig
// with the aliases.
export function runAddPreflight(cwd: string): AddProject {
  const configPath = path.join(cwd, CONFIG_FILE)
  if (!existsSync(configPath)) {
    if (existsSync(path.join(cwd, LEGACY_CONFIG_FILE)))
      throw new CliError(
        `${LEGACY_CONFIG_FILE} belongs to solidui-cli ${LEGACY_CLI_VERSION} and the Solid 1 registry. Keep using that version here:\n\n  npx solidui-cli@${LEGACY_CLI_VERSION} add <component>`
      )
    throw new CliError(
      `No ${CONFIG_FILE} in ${cwd}. Set up the project first:\n\n  npx ${CLI_NAME}@latest init`
    )
  }

  let raw: unknown
  try {
    raw = JSON.parse(readFileSync(configPath, "utf8"))
  } catch {
    throw new CliError(`${CONFIG_FILE} is not valid JSON.`)
  }
  const parsed = componentsJsonSchema.safeParse(raw)
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `  ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n")
    throw new CliError(
      `${CONFIG_FILE} doesn't match solidui-cli 1.x:\n${details}\n\nRun \`npx ${CLI_NAME}@latest init --force\` to write it again.`
    )
  }

  const tsconfig = findAppTsConfig(cwd)
  if (!tsconfig)
    throw new CliError(
      `No tsconfig.json in ${cwd}. solidui-cli installs TypeScript source.`
    )

  return { cwd, config: parsed.data, tsconfig }
}
