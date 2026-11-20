import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"

import { format } from "oxfmt"

import { adaptTheme } from "../apps/docs/src/lib/registry-theme.ts"
import config from "../oxfmt.config.ts"

const root = new URL("../", import.meta.url)
const manifest = JSON.parse(
  await readFile(new URL("vendor/shadcn/revision.json", root), "utf8")
)
for (const [file, hash] of Object.entries(manifest.files)) {
  const source = await readFile(
    new URL(`vendor/shadcn/styles/${file}`, root),
    "utf8"
  )
  if (createHash("sha256").update(source).digest("hex") !== hash)
    throw new Error(`Upstream input changed: ${file}`)
  const theme = file.slice(6, -4)
  const extension = await readFile(
    new URL(`vendor/shadcn/delta-${theme}.css`, root),
    "utf8"
  )
  const target = new URL(`apps/docs/src/registry/styles/${file}`, root)
  const result = await format(
    fileURLToPath(target),
    adaptTheme(source, extension),
    config
  )
  if (result.errors.length) throw new Error(JSON.stringify(result.errors))
  if (process.argv.includes("--check")) {
    if ((await readFile(target, "utf8")) !== result.code)
      throw new Error(`Run pnpm themes:generate: ${file}`)
  } else await writeFile(target, result.code)
}

// Verify the published global stylesheet matches the pinned upstream input.
const resolveFromDocs = createRequire(
  new URL("apps/docs/package.json", root)
).resolve
const sharedCss = await readFile(resolveFromDocs("shadcn/tailwind.css"))
if (
  createHash("sha256").update(sharedCss).digest("hex") !==
  manifest.utilities.sha256
)
  throw new Error(
    "Published shadcn stylesheet does not match the pinned utility source"
  )
