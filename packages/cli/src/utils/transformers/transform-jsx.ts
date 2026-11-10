import { type NodePath, type PluginObject, transformFromAstSync } from "@babel/core"
import { parse, type ParserOptions } from "@babel/parser"
import transformTypescript from "@babel/plugin-transform-typescript"
import * as recast from "recast"

import type { Transformer } from "~/utils/transformers"

// recast keeps the original formatting; Babel strips the TypeScript.
// The goal is to tolerate as much syntax as possible, so we can parse any valid tsx code.
//
// Babel 8 parses all standard syntax (class fields, optional chaining, import attributes, top-level
// await, ...) by default, so only non-standard syntax needs a plugin here. The withdrawn `decimal`,
// `importAssertions`, `recordAndTuple` and `minimal` pipeline proposals were removed from Babel 8.
const PARSE_OPTIONS: ParserOptions = {
  sourceType: "module",
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  // recast needs the token list to reprint the original source.
  tokens: true,
  plugins: [
    "typescript",
    "jsx",
    "decorators-legacy",
    "doExpressions",
    "exportDefaultFrom",
    "functionBind",
    "functionSent",
    "throwExpressions",
    "v8intrinsic"
  ]
}

// Babel 8's TypeScript plugin sets `typeArguments = null` on every call, `new`, tagged template and
// JSX element, even ones that never had type arguments. recast doesn't know that property, treats
// the new `null` as an edit and reformats the node (and its parents), so drop the empty value again.
const dropEmptyTypeArguments = (): PluginObject => ({
  name: "drop-empty-type-arguments",
  visitor: {
    "CallExpression|OptionalCallExpression|NewExpression|TaggedTemplateExpression|JSXOpeningElement": {
      exit(path: NodePath) {
        const node = path.node as { typeArguments?: unknown }
        if (node.typeArguments === null) {
          delete node.typeArguments
        }
      }
    }
  }
})

export const transformJsx: Transformer<string> = async ({ sourceFile, config }) => {
  const output = sourceFile.getFullText()

  if (config.tsx) {
    return output
  }

  const ast = recast.parse(output, {
    parser: {
      parse: (code: string) => {
        return parse(code, PARSE_OPTIONS)
      }
    }
  })

  const result = transformFromAstSync(ast, output, {
    cloneInputAst: false,
    code: false,
    ast: true,
    plugins: [transformTypescript, dropEmptyTypeArguments],
    configFile: false
  })

  if (!result || !result.ast) {
    throw new Error("Failed to transform JSX")
  }

  return recast.print(result.ast).code
}
