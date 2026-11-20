import type { JSX } from "@solidjs/web"
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-solid"
import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardHeader } from "~/registry/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "~/registry/ui/collapsible"
import { Tabs, TabsList, TabsTrigger } from "~/registry/ui/tabs"

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] }

const fileTree: FileTreeItem[] = [
  {
    name: "components",
    items: [
      {
        name: "ui",
        items: [
          { name: "button.tsx" },
          { name: "card.tsx" },
          { name: "dialog.tsx" },
          { name: "input.tsx" },
          { name: "select.tsx" },
          { name: "table.tsx" }
        ]
      },
      { name: "login-form.tsx" },
      { name: "register-form.tsx" }
    ]
  },
  {
    name: "lib",
    items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }]
  },
  {
    name: "hooks",
    items: [
      { name: "use-media-query.ts" },
      { name: "use-debounce.ts" },
      { name: "use-local-storage.ts" }
    ]
  },
  {
    name: "types",
    items: [{ name: "index.d.ts" }, { name: "api.d.ts" }]
  },
  {
    name: "public",
    items: [{ name: "favicon.ico" }, { name: "logo.svg" }, { name: "images" }]
  },
  { name: "app.tsx" },
  { name: "layout.tsx" },
  { name: "globals.css" },
  { name: "package.json" },
  { name: "tsconfig.json" },
  { name: "README.md" },
  { name: ".gitignore" }
]

const hasChildren = (
  item: FileTreeItem
): item is { name: string; items: FileTreeItem[] } => {
  return "items" in item
}

const renderItem = (item: FileTreeItem): JSX.Element => {
  if (hasChildren(item)) {
    return (
      <Collapsible>
        <CollapsibleTrigger
          render={(partProps) => (
            <Button {...partProps} size="sm" variant="ghost" />
          )}
          class="group/collapsible-trigger w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
        >
          <ChevronRightIcon class="size-4 transition-transform group-data-[expanded]/collapsible-trigger:rotate-90" />
          <FolderIcon class="size-4" />
          {item.name}
        </CollapsibleTrigger>
        <CollapsibleContent class="mt-1 ml-5">
          <div class="flex flex-col gap-1">
            <For each={item.items}>{(child) => renderItem(child)}</For>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Button
      class="w-full justify-start gap-2 text-foreground"
      size="sm"
      variant="link"
    >
      <FileIcon class="size-4" />
      <span>{item.name}</span>
    </Button>
  )
}

export default function CollapsibleFileTree() {
  return (
    <Card class="mx-auto w-full max-w-[16rem] gap-2" size="sm">
      <CardHeader>
        <Tabs defaultValue="explorer">
          <TabsList class="w-full">
            <TabsTrigger value="explorer">Explorer</TabsTrigger>
            <TabsTrigger value="outline">Outline</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-1 text-sm">
          <For each={fileTree}>{(item) => renderItem(item)}</For>
        </div>
      </CardContent>
    </Card>
  )
}
