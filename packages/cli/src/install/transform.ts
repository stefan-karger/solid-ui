import type { ComponentsJson } from "@solid-ui/registry/config"
import { transformIcons } from "@solid-ui/registry/icons"
import { transformMenu } from "@solid-ui/registry/menu"

const SPECIFIER =
  /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(~\/[^"'\n]+)\2/g

// Registry source imports through the default ~/ aliases. Rewrites them to the
// project's aliases; most projects keep the defaults and see no change.
export function rewriteAliases(
  code: string,
  aliases: ComponentsJson["aliases"]
) {
  const prefixes: [string, string][] = [
    ["~/components/ui", aliases.ui],
    ["~/components", aliases.components],
    ["~/lib", aliases.lib],
    ["~/hooks", aliases.hooks]
  ]
  const map = (specifier: string) => {
    if (specifier === "~/lib/utils") return aliases.utils
    for (const [from, to] of prefixes) {
      if (specifier === from || specifier.startsWith(`${from}/`))
        return `${to}${specifier.slice(from.length)}`
    }
    return specifier
  }
  return code.replace(
    SPECIFIER,
    (_, keyword: string, quote: string, specifier: string) =>
      `${keyword}${quote}${map(specifier)}${quote}`
  )
}

export function transformSource(
  path: string,
  code: string,
  config: Pick<ComponentsJson, "aliases" | "menuColor" | "iconLibrary">
) {
  if (!/\.[cm]?[jt]sx?$/.test(path)) return code
  const resolved = transformIcons(
    transformMenu(code, config.menuColor),
    config.iconLibrary
  )
  return rewriteAliases(resolved, config.aliases)
}
