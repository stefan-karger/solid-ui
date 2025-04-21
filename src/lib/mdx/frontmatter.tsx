import { valueToEstree } from "estree-util-value-to-estree";
import type { Literal, Parent } from "unist";
import { parse } from "yaml";

export type Frontmatter = {
  title: string;
  description: string;
  kobalte?: string;
};

export default function remarkSolidFrontmatter() {
  return (tree: Parent) => {
    const node = tree.children.find((node) => node.type === "yaml") as Literal;
    if (!node) {
      return;
    }
    const data = parse(node.value as string);

    tree.children.unshift({
      data: {
        estree: {
          body: [
            {
              declaration: {
                declarations: Object.entries({
                  frontmatter: data,
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
