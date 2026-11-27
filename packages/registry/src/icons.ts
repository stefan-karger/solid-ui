// Registry source names its icons with <IconPlaceholder lucide="CheckIcon" />,
// one prop per library, as shadcn/ui 0e5b2e6 does
// (packages/registry/src/icons/libraries.ts and
// packages/registry/src/transformers/transform-icons.ts, MIT). The docs and
// the CLI resolve each placeholder to the library's component.
//
// Presets store the library's index, in shadcn's order: lucide, hugeicons,
// tabler, phosphor, remixicon. Add a library only in that order.
//
// Each icon is imported from its own module: Solid's Vite plugin keeps Solid
// packages out of dependency prebundling, so a named import from the package
// root loads every icon (over 2,400 modules for Lucide) in development.
export const iconLibraries = {
  lucide: {
    name: "lucide",
    title: "Lucide",
    package: "@lucide/solid",
    // ChevronDownIcon is icons/chevron-down. Names whose digits or single
    // letters don't map back, like ArrowDown01Icon, fail the docs prebuild.
    module: (icon: string) =>
      `@lucide/solid/icons/${icon
        .replace(/Icon$/, "")
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([a-zA-Z])(\d)/g, "$1-$2")
        .toLowerCase()}`
  }
} as const

export type IconLibraryName = keyof typeof iconLibraries

export const iconLibraryNames = Object.keys(iconLibraries) as [
  IconLibraryName,
  ...IconLibraryName[]
]

export const DEFAULT_ICON_LIBRARY: IconLibraryName = "lucide"

type Attribute = { name: string | null; start: number; end: number }

type Placeholder = {
  start: number
  end: number
  nameEnd: number
  attributes: Attribute[]
  icons: Partial<Record<IconLibraryName, string>>
}

const PLACEHOLDER = /<IconPlaceholder\b/g
// One import declaration at the start of a line, read with the sticky flag.
const IMPORT =
  /^import\s+(?:[^"';]*?\s+from\s+)?["']([^"']+)["'];?[^\S\n]*(?:\n|$)/my

// The end of the brace expression that starts at `start`, skipping strings.
function skipExpression(source: string, start: number) {
  let depth = 0
  let quote = ""
  for (let index = start; index < source.length; index++) {
    const character = source[index]
    if (quote) {
      if (character === "\\") index++
      else if (character === quote) quote = ""
    } else if (character === '"' || character === "'" || character === "`") {
      quote = character
    } else if (character === "{") {
      depth++
    } else if (character === "}" && --depth === 0) {
      return index + 1
    }
  }
  throw new Error("[icons] Unterminated expression in an IconPlaceholder")
}

function parsePlaceholder(source: string, start: number): Placeholder {
  const nameEnd = start + "<IconPlaceholder".length
  const attributes: Attribute[] = []
  const icons: Placeholder["icons"] = {}
  let index = nameEnd
  while (index < source.length) {
    const attributeStart = index
    while (/\s/.test(source[index]!)) index++
    if (source.startsWith("/>", index))
      return { start, end: index + 2, nameEnd, attributes, icons }
    if (source[index] === ">")
      throw new Error("[icons] IconPlaceholder must be self-closing")
    if (source[index] === "{") {
      index = skipExpression(source, index)
      attributes.push({ name: null, start: attributeStart, end: index })
      continue
    }
    const nameStart = index
    while (/[^\s=/>]/.test(source[index]!)) index++
    const name = source.slice(nameStart, index)
    if (source[index] === "=") {
      index++
      const quote = source[index]
      if (quote === '"' || quote === "'") {
        const close = source.indexOf(quote, index + 1)
        if (name in iconLibraries)
          icons[name as IconLibraryName] = source.slice(index + 1, close)
        index = close + 1
      } else if (quote === "{") {
        if (name in iconLibraries)
          throw new Error(
            `[icons] IconPlaceholder needs a string ${name} icon name`
          )
        index = skipExpression(source, index)
      }
    }
    attributes.push({ name, start: attributeStart, end: index })
  }
  throw new Error("[icons] Unterminated IconPlaceholder")
}

function findPlaceholders(source: string) {
  return [...source.matchAll(PLACEHOLDER)].map((match) =>
    parsePlaceholder(source, match.index)
  )
}

// The icons a library needs for the placeholders in the source.
export function iconPlaceholderNames(
  source: string,
  library: IconLibraryName
): string[] {
  return findPlaceholders(source).map((placeholder) => {
    const icon = placeholder.icons[library]
    if (!icon)
      throw new Error(`[icons] IconPlaceholder without a ${library} icon`)
    return icon
  })
}

export function hasIconPlaceholders(source: string) {
  return /<IconPlaceholder\b/.test(source)
}

// Replaces each placeholder with the library's component, keeping its other
// props and layout, and swaps the IconPlaceholder import for the library's.
export function transformIcons(
  source: string,
  library: IconLibraryName
): string {
  const placeholders = findPlaceholders(source)
  if (!placeholders.length) return source

  const icons = new Set<string>()
  let code = ""
  let cursor = 0
  for (const placeholder of placeholders) {
    const icon = placeholder.icons[library]
    if (!icon)
      throw new Error(`[icons] IconPlaceholder without a ${library} icon`)
    icons.add(icon)
    code += `${source.slice(cursor, placeholder.start)}<${icon}`
    cursor = placeholder.nameEnd
    for (const attribute of placeholder.attributes) {
      if (attribute.name && attribute.name in iconLibraries) {
        code += source.slice(cursor, attribute.start)
        cursor = attribute.end
      }
    }
  }
  code += source.slice(cursor)

  const placeholderImport = leadingImports(code).find((match) =>
    match[1]!.endsWith("/icon-placeholder")
  )
  if (placeholderImport) {
    const start = placeholderImport.index
    let end = start + placeholderImport[0].length
    // An import alone in its group takes one of the blank lines around it.
    if (code.slice(start - 2, start) === "\n\n" && code[end] === "\n") end++
    code = code.slice(0, start) + code.slice(end)
  }
  const { module } = iconLibraries[library]
  return addImports(
    code,
    [...icons]
      .map((icon) => ({ icon, module: module(icon) }))
      .sort((a, b) => a.module.localeCompare(b.module))
  )
}

// The import declarations at the top of the module. Code samples in strings
// further down can contain import lines of their own.
function leadingImports(code: string) {
  const imports: RegExpExecArray[] = []
  const gap = /(?:\s|\/\/[^\n]*|\/\*[\s\S]*?\*\/)*/y
  const declaration = new RegExp(IMPORT)
  for (let index = 0; ; index = declaration.lastIndex) {
    gap.lastIndex = index
    gap.exec(code)
    declaration.lastIndex = gap.lastIndex
    const match = declaration.exec(code)
    if (!match) return imports
    imports.push(match)
  }
}

// Adds a default import per icon among the package imports, sorted by module.
function addImports(code: string, icons: { icon: string; module: string }[]) {
  const lines = icons
    .map(({ icon, module }) => `import ${icon} from "${module}"\n`)
    .join("")
  const packages = leadingImports(code).filter(
    (match) => !/^[.~]/.test(match[1]!)
  )
  const next = packages.find(
    (match) => match[1]!.localeCompare(icons[0]!.module) > 0
  )
  const last = packages.at(-1)
  const first = leadingImports(code)[0]
  const at = next
    ? next.index
    : last
      ? last.index + last[0].length
      : (first?.index ?? 0)
  // Without package imports, a blank line separates it from the alias ones.
  const separator = !last && first ? "\n" : ""
  return code.slice(0, at) + lines + separator + code.slice(at)
}
