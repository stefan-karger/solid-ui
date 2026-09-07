type HastNode = {
  children?: HastNode[]
  properties?: Record<string, unknown>
  tagName?: string
  type: string
}

const COMMAND_PROPERTIES = ["__npm__", "__yarn__", "__pnpm__", "__bun__"] as const

function visit(node: HastNode) {
  if (node.type === "element" && node.tagName === "pre") {
    const code = node.children?.find(
      (child) => child.type === "element" && child.tagName === "code"
    )

    if (code?.properties && COMMAND_PROPERTIES.every((property) => code.properties?.[property])) {
      node.properties ??= {}

      for (const property of COMMAND_PROPERTIES) {
        node.properties[property] = code.properties[property]
      }
    }
  }

  for (const child of node.children ?? []) visit(child)
}

export function rehypeCommandMetadata() {
  return (tree: HastNode) => visit(tree)
}
