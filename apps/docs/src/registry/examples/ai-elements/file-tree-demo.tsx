// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For, createSignal, createMemo } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "~/registry/ui/collapsible"

type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] }

const files: FileNode[] = [
  {
    type: "folder",
    name: "app",
    path: "app",
    children: [
      { type: "file", name: "layout.tsx", path: "app/layout.tsx" },
      { type: "file", name: "page.tsx", path: "app/page.tsx" }
    ]
  },
  {
    type: "folder",
    name: "components",
    path: "components",
    children: [
      {
        type: "folder",
        name: "ui",
        path: "components/ui",
        children: [
          {
            type: "file",
            name: "button.tsx",
            path: "components/ui/button.tsx"
          }
        ]
      },
      {
        type: "file",
        name: "login-form.tsx",
        path: "components/login-form.tsx"
      }
    ]
  }
]

function FileTreeNode(componentProps: {
  node: FileNode
  selected: string
  onSelect: (path: string) => void
}) {
  const content = createMemo(() => {
    const node = componentProps.node
    switch (node.type) {
      case "folder":
        return (
          <Collapsible defaultOpen class="group/folder">
            <CollapsibleTrigger
              render={(triggerProps) => (
                <Button
                  {...triggerProps}
                  variant="ghost"
                  size="sm"
                  class="group/folder-trigger w-full justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                    class="transition-transform group-aria-expanded/folder-trigger:rotate-90"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                  </svg>
                  {node.name}
                </Button>
              )}
            />
            <CollapsibleContent>
              <div class="ml-4 flex flex-col">
                {
                  <For each={node.children}>
                    {(child) => (
                      <FileTreeNode
                        node={child}
                        selected={componentProps.selected}
                        onSelect={componentProps.onSelect}
                      />
                    )}
                  </For>
                }
              </div>
            </CollapsibleContent>
          </Collapsible>
        )
      case "file":
        return (
          <Button
            variant="ghost"
            size="sm"
            class={cn("w-full justify-start font-normal", {
              "bg-accent text-accent-foreground":
                componentProps.selected === node.path
            })}
            aria-current={
              componentProps.selected === node.path ? "true" : undefined
            }
            onClick={() => componentProps.onSelect(node.path)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
            </svg>
            {node.name}
          </Button>
        )
      default: {
        const unreachable: never = node
        return unreachable
      }
    }
  })
  return <>{content()}</>
}

export default function FileTreeDemo() {
  const [selected, setSelected] = createSignal("components/ui/button.tsx")

  return (
    <div class="flex w-full max-w-xs flex-col py-6 text-sm">
      {
        <For each={files}>
          {(node) => (
            <FileTreeNode
              node={node}
              selected={selected()}
              onSelect={setSelected}
            />
          )}
        </For>
      }
    </div>
  )
}
