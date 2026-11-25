import { readFile, writeFile } from "node:fs/promises"

import { computeSupportedVersions } from "../src/versions/compute.ts"

const read = async (path: string) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"))

const versions = computeSupportedVersions(
  await read("../../../apps/docs/package.json")
)

await writeFile(
  new URL("../src/versions/supported-versions.json", import.meta.url),
  `${JSON.stringify(versions, null, 2)}\n`
)
console.log(
  "Supported versions written to src/versions/supported-versions.json."
)
