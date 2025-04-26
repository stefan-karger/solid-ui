import fs from "fs"
import path from "path"

import type { Node, Parent } from "unist"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"

import { Index } from "../../__registry__"

interface ComponentNode extends Node, Parent {
  name?: string
  attributes?: {
    name: string
    value: unknown
    type?: string
  }[]
}

export default function rehypeComponent() {
  return function (tree: ComponentNode) {
    visit(tree, (node) => {
      if (!("name" in node)) {
        return null
      }

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string
        if (!name) {
          return null
        }

        const component = Index[name]
        if (!component) {
          return null
        }

        const filePath = path.join(process.cwd(), "src", component.files[0].path)
        let source = fs.readFileSync(filePath, "utf-8")

        source = source.replaceAll("@/registry/", "@/components/")
        source = source.replaceAll("export default", "export")

        node.children?.push(
          u("element", {
            tagName: "pre",
            children: [
              u("element", {
                tagName: "code",
                properties: {
                  className: ["language-tsx"]
                },
                children: [
                  {
                    type: "text",
                    value: source
                  }
                ]
              })
            ]
          })
        )
      }

      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string
        if (!name) {
          return null
        }

        const component = Index[name]
        if (!component) {
          return null
        }

        const filePath = path.join(process.cwd(), "src", component.files[0].path)
        let source = fs.readFileSync(filePath, "utf-8")

        source = source.replaceAll("@/registry/", "@/components/")
        source = source.replaceAll("export default", "export")

        node.children?.push(
          u("element", {
            tagName: "pre",
            children: [
              u("element", {
                tagName: "code",
                properties: {
                  className: ["language-tsx"]
                },
                children: [
                  {
                    type: "text",
                    value: source
                  }
                ]
              })
            ]
          })
        )
      }
    })
  }
}

const getNodeAttributeByName = (node: ComponentNode, name: string) => {
  return node.attributes?.find((attribute) => attribute.name === name)
}
