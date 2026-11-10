import { Project, ScriptKind, type SourceFile } from "ts-morph"

import type { Config } from "~/utils/config"
import { transformImport } from "~/utils/transformers/transform-import"
import { transformJsx } from "~/utils/transformers/transform-jsx"
import { transformTwPrefix } from "~/utils/transformers/transform-tw-prefix"

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

// Source files only live in memory: nothing is read from or written to disk here.
const project = new Project({
  useInMemoryFileSystem: true,
  compilerOptions: {}
})

export async function transform(props: TransformProps) {
  const sourceFile = project.createSourceFile(props.filename, props.raw, {
    scriptKind: ScriptKind.TSX,
    overwrite: true
  })

  try {
    await transformImport({ sourceFile, ...props })
    await transformTwPrefix({ sourceFile, ...props })

    return await transformJsx({ sourceFile, ...props })
  } finally {
    project.removeSourceFile(sourceFile)
  }
}
