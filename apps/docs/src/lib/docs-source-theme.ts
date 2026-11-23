import { highlightCode } from "~/registry/lib/highlighter"

import { isDocsStyle } from "./appearance"

const sources = new Map<string, Promise<{ code: string; language: string }>>()
let listening = false

export function initializeSourceThemes() {
  const update = async () => {
    const style = document.documentElement.dataset.docsStyle
    if (!isDocsStyle(style)) return
    await Promise.all(
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-registry-path]"),
        async (figure) => {
          const content = figure.querySelector<HTMLElement>(
            "[data-source-content]"
          )
          const copy =
            figure.querySelector<HTMLButtonElement>("[data-copy-button]")
          if (!content || !copy) return
          figure.dataset.requestedStyle = style
          if (figure.dataset.sourceStyle === style) {
            copy.disabled = false
            return
          }
          const key = `${style}/${figure.dataset.registryPath}`
          const code =
            sources.get(key) ??
            fetch(`/registry-source/${key}.json`).then(async (response) => {
              if (!response.ok) throw new Error(`Could not load ${key}`)
              return response.json() as Promise<{
                code: string
                language: string
              }>
            })
          sources.set(key, code)
          copy.disabled = true
          try {
            const source = await code
            const html = await highlightCode(source.code, source.language)
            if (
              figure.dataset.requestedStyle !== style ||
              document.documentElement.dataset.docsStyle !== style ||
              !figure.isConnected
            )
              return
            content.innerHTML = html
            copy.dataset.copyValue = source.code
            figure.dataset.sourceStyle = style
          } catch (error) {
            sources.delete(key)
            console.error("[docs-source]", error)
          } finally {
            if (figure.dataset.requestedStyle === style) copy.disabled = false
          }
        }
      )
    )
  }
  if (!listening) {
    window.addEventListener("solid-ui:appearance", () => void update())
    listening = true
  }
  void update()
}
