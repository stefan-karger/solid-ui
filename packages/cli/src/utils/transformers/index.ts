import { mkdtemp } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { Project, ScriptKind, type SourceFile } from "ts-morph"

import type { Config } from "@/utils/config"
import { transformImport } from "@/utils/transformers/transform-import"
import { transformJsx } from "@/utils/transformers/transform-jsx"
import { transformTwPrefix } from "@/utils/transformers/transform-tw-prefix"

export type TransformProps = {
  filename: string
  raw: string
  config: Config
}

export type Transformer<Output = SourceFile> = (
  props: TransformProps & {
    sourceFile: SourceFile
  }
) => Promise<Output>

const project = new Project({
  compilerOptions: {}
})

async function createTempSourceFile(filename: string) {
  const dir = await mkdtemp(path.join(tmpdir(), "solidui-"))
  return path.join(dir, filename)
}

export async function transform(props: TransformProps) {
  const tempFile = await createTempSourceFile(props.filename)
  const sourceFile = project.createSourceFile(tempFile, props.raw, { scriptKind: ScriptKind.TSX })

  transformImport({ sourceFile, ...props })
  transformTwPrefix({ sourceFile, ...props })

  return await transformJsx({ sourceFile, ...props })
}
