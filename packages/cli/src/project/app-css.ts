// The app stylesheet needs two lines and keeps everything else:
// - `@layer ui-sdk;` first, so app styles win over UI SDK's own CSS. A layer
//   statement must come before the @import rules, hence the top of the file.
// - `@import "./solid-ui.css";` right after the Tailwind import.
const TAILWIND_IMPORT =
  /^[ \t]*@import\s+(?:url\()?["']tailwindcss["'][^;\n]*;[ \t]*(?:\r?\n|$)/m
const LAYER = /^\s*@layer\s+ui-sdk\s*;/m

export function solidUiImport(file = "solid-ui.css") {
  return `@import "./${file}";`
}

export function patchAppCss(css: string, file = "solid-ui.css") {
  const eol = css.includes("\r\n") ? "\r\n" : "\n"
  let output = css

  const importPattern = new RegExp(
    `@import\\s+(?:url\\()?["']\\./${file.replace(/\./g, "\\.")}["']`
  )
  if (!importPattern.test(output)) {
    const match = TAILWIND_IMPORT.exec(output)
    if (!match) throw new Error('The stylesheet has no @import "tailwindcss".')
    const end = match.index + match[0].length
    const separator = match[0].endsWith("\n") ? "" : eol
    output = `${output.slice(0, end)}${separator}${solidUiImport(file)}${eol}${output.slice(end)}`
  }

  if (!LAYER.test(output)) {
    const charset = /^@charset[^;]*;[ \t]*\r?\n?/.exec(output)
    const at = charset ? charset[0].length : 0
    output = `${output.slice(0, at)}@layer ui-sdk;${eol}${eol}${output.slice(at)}`
  }

  return output
}
