export const styles = [
  "vega",
  "nova",
  "maia",
  "lyra",
  "mira",
  "luma",
  "sera",
  "rhea"
] as const
export type DocsStyle = (typeof styles)[number]
export type ColorMode = "light" | "dark"
export const appearanceKey = "solid-ui-appearance"

export function isDocsStyle(value: unknown): value is DocsStyle {
  return styles.some((style) => style === value)
}

export function readAppearance(
  storage: Pick<Storage, "getItem">,
  prefersDark = false,
  defaultStyle: DocsStyle = "nova"
) {
  try {
    const saved = JSON.parse(storage.getItem(appearanceKey) ?? "null")
    return {
      style: isDocsStyle(saved?.style) ? saved.style : defaultStyle,
      mode:
        saved?.mode === "dark" || saved?.mode === "light"
          ? (saved.mode as ColorMode)
          : prefersDark
            ? ("dark" as const)
            : ("light" as const)
    }
  } catch {
    return {
      style: defaultStyle,
      mode: prefersDark ? ("dark" as const) : ("light" as const)
    }
  }
}

export function applyAppearance(style: DocsStyle, mode: ColorMode) {
  const root = document.documentElement
  for (const name of styles)
    root.classList.toggle(`style-${name}`, name === style)
  root.classList.toggle("dark", mode === "dark")
  root.style.colorScheme = mode
  root.dataset.docsStyle = style
  root.dataset.colorMode = mode
  window.dispatchEvent(
    new CustomEvent("solid-ui:appearance", { detail: { style, mode } })
  )
}

export function saveAppearance(style: DocsStyle, mode: ColorMode) {
  try {
    localStorage.setItem(appearanceKey, JSON.stringify({ style, mode }))
  } catch {
    /* Storage may be disabled by the browser. */
  }
  applyAppearance(style, mode)
}

export const appearanceBootstrap = `(()=>{const styles=${JSON.stringify(styles)},root=document.documentElement;let style=root.dataset.defaultStyle||"nova",mode=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";try{const p=JSON.parse(localStorage.getItem(${JSON.stringify(appearanceKey)})||"null");if(styles.includes(p?.style))style=p.style;if(p?.mode==="light"||p?.mode==="dark")mode=p.mode}catch{}for(const s of styles)root.classList.toggle("style-"+s,s===style);root.classList.toggle("dark",mode==="dark");root.style.colorScheme=mode;root.dataset.docsStyle=style;root.dataset.colorMode=mode})()`
