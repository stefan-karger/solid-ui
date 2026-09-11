export const ACTIVE_REGISTRY_STYLE = "nova"

export type RegistrySourceLanguage = "tsx" | "ts" | "jsx" | "js" | "css" | "json" | "text"

export type PreparedRegistrySource = {
  code: string
  language: RegistrySourceLanguage
  registryPath: string
  displayPath: string
}

type PrepareRegistrySourceOptions = {
  registryPath: string
  styleName: string
  styleCss?: string
  target?: string
}

const INTERNAL_ALIASES = [
  ["~/registry/ui/", "~/components/ui/"],
  ["~/registry/lib/", "~/lib/"],
  ["~/registry/hooks/", "~/hooks/"]
] as const

const SCRIPT_LANGUAGES = new Set<RegistrySourceLanguage>(["tsx", "ts", "jsx", "js"])

export function inferRegistryLanguage(path: string): RegistrySourceLanguage {
  const extension = path.split(".").pop()?.toLowerCase()
  return extension === "tsx" ||
    extension === "ts" ||
    extension === "jsx" ||
    extension === "js" ||
    extension === "css" ||
    extension === "json"
    ? extension
    : "text"
}

export function getRegistryDisplayPath(registryPath: string, target?: string): string {
  if (target) return target
  if (registryPath.startsWith("ui/")) return `components/${registryPath}`
  return registryPath
}

export function extractStyleMap(styleCss: string, styleName: string): Map<string, string> {
  const result = new Map<string, string>()
  const selector = /\.((?:cn-)[a-z0-9-]+)\s*\{/g
  let match: RegExpExecArray | null

  while ((match = selector.exec(styleCss))) {
    const token = match[1]!
    let depth = 1
    let cursor = selector.lastIndex
    let quote: '"' | "'" | null = null

    for (; cursor < styleCss.length && depth > 0; cursor++) {
      const character = styleCss[cursor]
      const previous = styleCss[cursor - 1]
      if (quote) {
        if (character === quote && previous !== "\\") quote = null
      } else if (character === '"' || character === "'") {
        quote = character
      } else if (character === "{") {
        depth++
      } else if (character === "}") {
        depth--
      }
    }

    if (depth !== 0) {
      throw new Error(`[registry-source] Malformed .${token} rule in style-${styleName}.css`)
    }

    const body = styleCss.slice(selector.lastIndex, cursor - 1)
    const utilities = [...body.matchAll(/@apply\s+([^;]+);/g)]
      .map((apply) => apply[1]!.trim())
      .filter(Boolean)
      .join(" ")

    if (!utilities) {
      throw new Error(
        `[registry-source] .${token} has no @apply declaration in style-${styleName}.css`
      )
    }

    const previous = result.get(token)
    if (previous && previous !== utilities) {
      throw new Error(
        `[registry-source] Conflicting .${token} definitions in style-${styleName}.css`
      )
    }
    if (previous) {
      throw new Error(`[registry-source] Duplicate .${token} definition in style-${styleName}.css`)
    }

    result.set(token, utilities)
    selector.lastIndex = cursor
  }

  return result
}

function rewriteInternalAliases(source: string): string {
  let transformed = source
  for (const [internal, consumer] of INTERNAL_ALIASES) {
    transformed = transformed.replaceAll(internal, consumer)
  }
  return transformed
}

function replaceSemanticTokens(
  source: string,
  styleMap: Map<string, string>,
  registryPath: string
): string {
  const stringLiteral = /(["'`])(?:\\.|(?!\1)[\s\S])*?\1/g

  return source.replace(stringLiteral, (literal, quote: string) => {
    if (!/\bcn-[a-z0-9-]+\b/.test(literal)) return literal
    if (quote === "`" && literal.includes("${")) {
      throw new Error(
        `[registry-source] Cannot safely transform a semantic class in a template expression in ${registryPath}`
      )
    }

    const value = literal
      .slice(1, -1)
      .replace(/(?:^|\s)\bcn-[a-z0-9-]+\b(?=\s|$)/g, (segment: string) => {
        const token = segment.trim()
        const utilities = styleMap.get(token)
        if (!utilities) return ""

        const leadingWhitespace = segment.slice(0, segment.length - token.length)
        const escapedUtilities =
          quote === "'" ? utilities.replaceAll("'", "\\'") : utilities.replaceAll('"', '\\"')
        return `${leadingWhitespace}${escapedUtilities}`
      })
      .trim()

    return `${quote}${value}${quote}`
  })
}

export async function prepareRegistrySource(
  raw: string,
  options: PrepareRegistrySourceOptions
): Promise<PreparedRegistrySource> {
  const language = inferRegistryLanguage(options.registryPath)
  let code = raw.replace(/\r\n?/g, "\n").trimEnd()
  code = rewriteInternalAliases(code)

  if (SCRIPT_LANGUAGES.has(language)) {
    if (!options.styleCss) {
      throw new Error(
        `[registry-source] Missing style-${options.styleName}.css while preparing ${options.registryPath}`
      )
    }
    code = replaceSemanticTokens(
      code,
      extractStyleMap(options.styleCss, options.styleName),
      options.registryPath
    )
  }

  if (/~\/registry\/(?:ui|lib|hooks)\//.test(code)) {
    throw new Error(`[registry-source] Internal registry alias remains in ${options.registryPath}`)
  }
  if (SCRIPT_LANGUAGES.has(language) && /\bcn-[a-z0-9-]+\b/.test(code)) {
    throw new Error(`[registry-source] Semantic class remains in ${options.registryPath}`)
  }

  return {
    code,
    language,
    registryPath: options.registryPath,
    displayPath: getRegistryDisplayPath(options.registryPath, options.target)
  }
}
