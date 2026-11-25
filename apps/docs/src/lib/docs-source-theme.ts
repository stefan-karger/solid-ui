import { inferRegistryLanguage } from "@solid-ui/registry/source"

import { highlightCode } from "~/registry/lib/highlighter"

import { isDocsStyle } from "./appearance"

type PublishedItem = { files: { path: string; content: string }[] }

const items = new Map<string, Promise<PublishedItem>>()
let listening = false

function loadItem(key: string) {
  let item = items.get(key)
  if (!item) {
    item = fetch(`/r/styles/${key}.json`).then(async (response) => {
      if (!response.ok) throw new Error(`Could not load ${key}`)
      return response.json() as Promise<PublishedItem>
    })
    items.set(key, item)
  }
  return item
}

export function initializeSourceThemes() {
  const update = async () => {
    const style = document.documentElement.dataset.docsStyle
    if (!isDocsStyle(style)) return
    await Promise.all(
      Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-registry-item][data-registry-path]"
        ),
        async (figure) => {
          const content = figure.querySelector<HTMLElement>(
            "[data-source-content]"
          )
          const copy =
            figure.querySelector<HTMLButtonElement>("[data-copy-button]")
          const path = figure.dataset.registryPath
          if (!content || !copy || !path) return
          figure.dataset.requestedStyle = style
          if (figure.dataset.sourceStyle === style) {
            copy.disabled = false
            return
          }
          const key = `${style}/${figure.dataset.registryItem}`
          copy.disabled = true
          try {
            const file = (await loadItem(key)).files.find(
              (candidate) => candidate.path === path
            )
            if (!file) throw new Error(`${key} does not publish ${path}`)
            const html = await highlightCode(
              file.content,
              inferRegistryLanguage(path)
            )
            if (
              figure.dataset.requestedStyle !== style ||
              document.documentElement.dataset.docsStyle !== style ||
              !figure.isConnected
            )
              return
            content.innerHTML = html
            copy.dataset.copyValue = file.content
            figure.dataset.sourceStyle = style
          } catch (error) {
            items.delete(key)
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
