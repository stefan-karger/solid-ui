import { blocks } from "@/registry/registry-blocks"
import { examples } from "@/registry/registry-examples"
import { ui } from "@/registry/registry-ui"
import type { Registry } from "@/registry/schema"

export const registry: Registry = [...ui, ...examples, ...blocks]
