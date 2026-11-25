import { existsSync } from "node:fs"
import path from "node:path"

import { CONFIG_FILE, LEGACY_CONFIG_FILE } from "@solid-ui/registry/config"
import { SUPPORTED_VERSIONS } from "@solid-ui/registry/versions"

import { INSTALLATION_URL, LEGACY_CLI_VERSION } from "~/constants"
import { findTailwindStylesheets } from "~/project/css"
import { declaredRange, readPackageJson } from "~/project/package-json"
import {
  findAppTsConfig,
  TILDE_ALIAS,
  tsPaths,
  type TsConfigFile
} from "~/project/tsconfig"
import {
  isBelowRange,
  majorOf,
  resolveVersion,
  satisfies,
  type ResolvedVersion
} from "~/project/versions"
import { readViteConfig, resolvesTildeAlias } from "~/project/vite"

export type PreflightIssue = {
  level: "error" | "warning"
  code:
    | "no-project"
    | "legacy-project"
    | "legacy-versions"
    | "unsupported-version"
    | "unresolved-version"
    | "missing-requirement"
    | "no-tailwind-css"
    | "ambiguous-tailwind-css"
    | "missing-css"
    | "no-typescript"
    | "jsx-import-source"
    | "unsupported-framework"
  message: string
}

export type InitProject = {
  cwd: string
  // Stylesheet with `@import "tailwindcss"`, relative to cwd.
  tailwindCss: string
  tsconfig: TsConfigFile
  // True when the tsconfig has no `~/*` path yet; init adds it.
  needsTildeAlias: boolean
  // Path target for `~/*`: ./src/* when the project has a src folder.
  tildeTarget: string
  // True when Vite's config shows nothing that resolves `~/`.
  needsViteAliasHint: boolean
  hasConfig: boolean
  versions: Record<string, ResolvedVersion>
}

export type InitPreflight =
  | { ok: true; project: InitProject; issues: PreflightIssue[] }
  | { ok: false; issues: PreflightIssue[] }

export type InitPreflightOptions = {
  // Overrides the Tailwind stylesheet search, as `--css` does.
  css?: string
  cliVersion: string
}

// Solid and Tailwind majors below these belong to the legacy registry.
const LEGACY_MAJORS: Record<string, number> = {
  "solid-js": 2,
  "@solidjs/web": 2,
  tailwindcss: 4
}

function formatRanges() {
  const entries = Object.entries(SUPPORTED_VERSIONS.requirements)
  return entries.map(([name, range]) => `  ${name} ${range}`).join("\n")
}

function legacyMessage(found: string[]) {
  return [
    "solidui-cli 1.x requires Solid 2 (solid-js and @solidjs/web) and Tailwind CSS 4.",
    `Found ${found.join(", ")}.`,
    "",
    "These are the minimum requirements from solidui-cli 1.0 on. For the previous",
    "registry (Solid 1, Kobalte and Corvu, Tailwind CSS 3), use version",
    `${LEGACY_CLI_VERSION} directly:`,
    "",
    `  npx solidui-cli@${LEGACY_CLI_VERSION} init`
  ].join("\n")
}

function rangeMessage(cliVersion: string, found: ResolvedVersion[]) {
  const describe = (entry: ResolvedVersion) =>
    "version" in entry ? `${entry.name} ${entry.version}` : entry.name
  const newer = found.some(
    (entry) =>
      "version" in entry &&
      !isBelowRange(entry.version, SUPPORTED_VERSIONS.requirements[entry.name]!)
  )
  return [
    `solidui-cli ${cliVersion} supports these versions, which the Solid UI docs are tested with:`,
    formatRanges(),
    `Found ${found.map(describe).join(", ")}.`,
    "",
    newer
      ? "Newer versions are supported once a solidui-cli release has been tested with them.\nCheck for one with: npx solidui-cli@latest init"
      : "Update the packages listed above, then run init again."
  ].join("\n")
}

export function runInitPreflight(
  cwd: string,
  options: InitPreflightOptions
): InitPreflight {
  const issues: PreflightIssue[] = []
  const error = (code: PreflightIssue["code"], message: string) =>
    issues.push({ level: "error", code, message })
  const warn = (code: PreflightIssue["code"], message: string) =>
    issues.push({ level: "warning", code, message })

  const pkg = readPackageJson(cwd)
  if (!pkg) {
    error(
      "no-project",
      `No package.json found in ${cwd}. Run init in the root of a Solid app.\nTo create one, see ${INSTALLATION_URL}.`
    )
    return { ok: false, issues }
  }

  if (existsSync(path.join(cwd, LEGACY_CONFIG_FILE))) {
    error(
      "legacy-project",
      `${LEGACY_CONFIG_FILE} belongs to solidui-cli ${LEGACY_CLI_VERSION} and the Solid 1 registry.\nKeep using that version for this project:\n\n  npx solidui-cli@${LEGACY_CLI_VERSION} add <component>\n\nTo move to Solid UI 1.x, upgrade to Solid 2 and Tailwind CSS 4, delete ${LEGACY_CONFIG_FILE} and run init again.`
    )
  }

  // Versions of everything the CLI requires.
  const versions: Record<string, ResolvedVersion> = {}
  for (const name of Object.keys(SUPPORTED_VERSIONS.requirements))
    versions[name] = resolveVersion(cwd, pkg, name)

  const legacy = Object.entries(LEGACY_MAJORS).flatMap(([name, major]) => {
    const entry = versions[name]!
    return "version" in entry && majorOf(entry.version) < major
      ? [`${name} ${entry.version}`]
      : []
  })
  if (legacy.length) error("legacy-versions", legacyMessage(legacy))

  // A Solid 1 or Tailwind CSS 3 project only needs the pointer to 0.7.2.
  const missing = legacy.length
    ? []
    : Object.values(versions).filter((entry) => entry.source === "missing")
  for (const entry of missing) {
    const framework =
      entry.name === "vite" || entry.name === "@solidjs/vite-plugin"
    error(
      framework ? "unsupported-framework" : "missing-requirement",
      framework
        ? `${entry.name} is not installed. solidui-cli supports Solid apps built with Vite and @solidjs/vite-plugin.\nSee ${INSTALLATION_URL}.`
        : `${entry.name} is not installed. Install it, then run init again.\nSee ${INSTALLATION_URL}.`
    )
  }

  for (const entry of Object.values(versions)) {
    if (!legacy.length && entry.source === "unresolved") {
      error(
        "unresolved-version",
        `Could not tell which ${entry.name} version "${entry.declared}" means. Install the dependencies first, for example with \`npm install\`.`
      )
    }
  }

  if (!legacy.length) {
    const outside = Object.values(versions).filter(
      (entry) =>
        "version" in entry &&
        !satisfies(entry.version, SUPPORTED_VERSIONS.requirements[entry.name]!)
    )
    if (outside.length)
      error("unsupported-version", rangeMessage(options.cliVersion, outside))
  }

  // Tailwind CSS 4 entry stylesheet.
  let tailwindCss: string | undefined
  if (options.css) {
    if (existsSync(path.resolve(cwd, options.css))) tailwindCss = options.css
    else error("missing-css", `${options.css} does not exist.`)
  } else {
    const stylesheets = findTailwindStylesheets(cwd)
    if (stylesheets.length === 1) tailwindCss = stylesheets[0]
    else if (stylesheets.length > 1)
      error(
        "ambiguous-tailwind-css",
        `More than one stylesheet imports Tailwind CSS: ${stylesheets.join(", ")}.\nPick the app stylesheet with --css <file>.`
      )
    else if (!legacy.length && versions.tailwindcss?.source !== "missing")
      error(
        "no-tailwind-css",
        `No stylesheet imports Tailwind CSS. Add \`@import "tailwindcss";\` to your app stylesheet.\nSee https://tailwindcss.com/docs/installation/using-vite.`
      )
  }

  // TypeScript only.
  const tsconfig = findAppTsConfig(cwd)
  if (!tsconfig || !declaredRange(pkg, "typescript")) {
    error(
      "no-typescript",
      "solidui-cli 1.x installs TypeScript source and needs a TypeScript project: a tsconfig.json and the typescript package."
    )
  } else {
    const source = tsconfig.config.compilerOptions?.jsxImportSource
    if (source !== "@solidjs/web")
      warn(
        "jsx-import-source",
        `${path.basename(tsconfig.path)} sets jsxImportSource to ${source ?? "nothing"}. Solid 2 components need "@solidjs/web".`
      )
  }

  if (
    issues.some((issue) => issue.level === "error") ||
    !tsconfig ||
    !tailwindCss
  )
    return { ok: false, issues }

  const needsTildeAlias = !(TILDE_ALIAS in tsPaths(tsconfig))
  const vite = readViteConfig(cwd)
  return {
    ok: true,
    issues,
    project: {
      cwd,
      tailwindCss,
      tsconfig,
      needsTildeAlias,
      tildeTarget: existsSync(path.join(cwd, "src")) ? "./src/*" : "./*",
      needsViteAliasHint: !vite || !resolvesTildeAlias(vite.text),
      hasConfig: existsSync(path.join(cwd, CONFIG_FILE)),
      versions
    }
  }
}
