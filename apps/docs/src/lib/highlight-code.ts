import type { ShikiTransformer } from "shiki"

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
