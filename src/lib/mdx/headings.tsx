import { valueToEstree } from "estree-util-value-to-estree";
import type { Node, Parent } from "unist";
import { visit } from "unist-util-visit";

interface ElementNode extends Node {
  tagName: string;
  value: string;
  properties: {
    id: string;
  };
}

export type Heading = {
  depth: number;
  text: string;
  slug: string;
};

export default function rehypeHeadings() {
  return (tree: Parent) => {
    const headings: Heading[] = [];

    visit(tree, "element", (node: ElementNode) => {
      if (node.tagName[0] !== "h") return;
      const [, level] = node.tagName.match(/h([0-6])/) ?? [];
      const depth = Number.parseInt(level);

      let text = "";
      visit(node, (node, _, parent) => {
        if (node.type === "element" || parent === null) {
          return;
        }
        if (node.type === "raw" && node.value.match(/^\n?<.*>\n?$/)) {
          return;
        }
        if (new Set(["text"]).has(node.type)) {
          text += node.value;
        }
      });

      node.properties = node.properties || {};

      headings.push({
        depth,
        slug: node.properties.id,
        text,
      });
    });

    tree.children.unshift({
      data: {
        estree: {
          body: [
            {
              declaration: {
                declarations: Object.entries({
                  headings,
                }).map(([identifier, value]) => ({
                  id: {
                    name: identifier,
                    type: "Identifier",
                  },
                  init: valueToEstree(value),
                  type: "VariableDeclarator",
                })),
                kind: "const",
                type: "VariableDeclaration",
              },
              specifiers: [],
              type: "ExportNamedDeclaration",
            },
          ],
          sourceType: "module",
          type: "Program",
        },
      },
      type: "mdxjsEsm",
    });
  };
}
