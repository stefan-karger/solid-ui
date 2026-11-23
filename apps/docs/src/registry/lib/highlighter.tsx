import type { HighlighterCore, ThemedToken } from "shiki/core"
import { For } from "solid-js"

let highlighter: Promise<HighlighterCore> | undefined
async function loadHighlighter() {
  const [
    core,
    engine,
    light,
    dark,
    js,
    jsx,
    ts,
    tsx,
    css,
    json,
    python,
    shell
  ] = await Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/themes/github-light-default.mjs"),
    import("shiki/themes/github-dark.mjs"),
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/jsx.mjs"),
    import("shiki/langs/typescript.mjs"),
    import("shiki/langs/tsx.mjs"),
    import("shiki/langs/css.mjs"),
    import("shiki/langs/json.mjs"),
    import("shiki/langs/python.mjs"),
    import("shiki/langs/shellscript.mjs")
  ])
  return core.createHighlighterCore({
    engine: engine.createJavaScriptRegexEngine(),
    themes: [light.default, dark.default],
    langs: [
      js.default,
      jsx.default,
      ts.default,
      tsx.default,
      css.default,
      json.default,
      python.default,
      shell.default
    ]
  })
}

export async function highlightCodeTokens(code: string, language: string) {
  highlighter ??= loadHighlighter()
  const instance = await highlighter
  const lang =
    language === "ansi" || instance.getLoadedLanguages().includes(language)
      ? language
      : "text"
  return instance.codeToTokens(code, {
    lang,
    themes: { light: "github-light-default", dark: "github-dark" },
    defaultColor: false,
    cssVariablePrefix: "--token-"
  }).tokens
}

export function renderHighlightedLines(lines: ThemedToken[][]) {
  return lines.map((line) =>
    line.length === 0 ? (
      ""
    ) : (
      <For each={line}>
        {(token) => (
          <span
            class="text-(--token-light) dark:text-(--token-dark)"
            style={token.htmlStyle}
          >
            {token.content}
          </span>
        )}
      </For>
    )
  )
}

export async function highlightCode(code: string, language = "text") {
  highlighter ??= loadHighlighter()
  const instance = await highlighter
  const lang = instance.getLoadedLanguages().includes(language)
    ? language
    : "text"
  return instance.codeToHtml(code, {
    lang,
    themes: { light: "github-light-default", dark: "github-dark" },
    transformers: [
      {
        pre(node) {
          node.properties.class =
            "shiki no-scrollbar min-w-0 overflow-auto overscroll-contain px-4 py-3.5 outline-none !bg-transparent"
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
