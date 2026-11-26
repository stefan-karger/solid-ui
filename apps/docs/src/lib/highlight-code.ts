import {
  createHighlighter,
  type BundledLanguage,
  type Highlighter,
  type ShikiTransformer
} from "shiki"

export const LIGHT_CODE_THEME = "github-light-default"
export const DARK_CODE_THEME = "github-dark"

const registryLanguages = [
  "tsx",
  "ts",
  "jsx",
  "js",
  "css",
  "json",
  "text"
] as const
let highlighterPromise: Promise<Highlighter> | undefined

function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: [LIGHT_CODE_THEME, DARK_CODE_THEME],
    langs: [...registryLanguages]
  })
  return highlighterPromise
}

export async function highlightCode(
  code: string,
  language: string
): Promise<string> {
  const highlighter = await getHighlighter()
  const lang = registryLanguages.includes(
    language as (typeof registryLanguages)[number]
  )
    ? (language as BundledLanguage)
    : "text"

  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: LIGHT_CODE_THEME, dark: DARK_CODE_THEME },
    transformers: [
      {
        pre(node) {
          node.properties["class"] =
            "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 !bg-transparent"
        },
        code(node) {
          node.properties["data-line-numbers"] = ""
        },
        line(node) {
          node.properties["data-line"] = ""
        }
      }
    ]
  })
}

export const transformers = [
  {
    code(node) {
      if (node.tagName !== "code") return

      const raw = this.source.replace(/\r\n?/g, "\n").trimEnd()
      node.properties["__raw__"] = raw

      if (raw.startsWith("npm install")) {
        node.properties["__npm__"] = raw
        node.properties["__yarn__"] = raw.replace("npm install", "yarn add")
        node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add")
        node.properties["__bun__"] = raw.replace("npm install", "bun add")
      } else if (raw.startsWith("npx create-")) {
        node.properties["__npm__"] = raw
        node.properties["__yarn__"] = raw.replace("npx create-", "yarn create ")
        node.properties["__pnpm__"] = raw.replace("npx create-", "pnpm create ")
        node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
      } else if (raw.startsWith("npm create")) {
        node.properties["__npm__"] = raw
        node.properties["__yarn__"] = raw.replace("npm create", "yarn create")
        node.properties["__pnpm__"] = raw.replace("npm create", "pnpm create")
        node.properties["__bun__"] = raw.replace("npm create", "bun create")
      } else if (raw.startsWith("npx")) {
        node.properties["__npm__"] = raw
        node.properties["__yarn__"] = raw.replace("npx", "yarn dlx")
        node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx")
        node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
      } else if (raw.startsWith("npm run")) {
        node.properties["__npm__"] = raw
        node.properties["__yarn__"] = raw.replace("npm run", "yarn")
        node.properties["__pnpm__"] = raw.replace("npm run", "pnpm")
        node.properties["__bun__"] = raw.replace("npm run", "bun")
      }
    }
  }
] satisfies ShikiTransformer[]
