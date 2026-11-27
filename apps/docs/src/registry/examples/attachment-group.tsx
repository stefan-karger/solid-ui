import type { ComponentProps } from "@solidjs/web"
import { For, type Component } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle
} from "~/registry/ui/attachment"

type Item = {
  name: string
  meta: string
  icon?: Component<ComponentProps<"svg">>
  src?: string
}

const items: Item[] = [
  {
    name: "briefing-notes.pdf",
    meta: "PDF · 1.4 MB",
    icon: (props) => <IconPlaceholder lucide="FileTextIcon" {...props} />
  },
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
  },
  {
    name: "customers.csv",
    meta: "CSV · 18 KB",
    icon: (props) => <IconPlaceholder lucide="TableIcon" {...props} />
  },
  {
    name: "renderer.tsx",
    meta: "TSX · 12 KB",
    icon: (props) => <IconPlaceholder lucide="FileCodeIcon" {...props} />
  }
]

export default function AttachmentGroupDemo() {
  return (
    <div class="mx-auto w-full max-w-sm py-12">
      <AttachmentGroup class="w-full">
        <For each={items}>
          {(item) => {
            const Icon = item.icon

            return (
              <Attachment class="w-64">
                {item.src ? (
                  <AttachmentMedia variant="image">
                    <img src={item.src} alt={item.name} />
                  </AttachmentMedia>
                ) : Icon ? (
                  <AttachmentMedia>
                    <Icon />
                  </AttachmentMedia>
                ) : null}
                <AttachmentContent>
                  <AttachmentTitle>{item.name}</AttachmentTitle>
                  <AttachmentDescription>{item.meta}</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label={`Remove ${item.name}`}>
                    <IconPlaceholder lucide="XIcon" />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            )
          }}
        </For>
      </AttachmentGroup>
    </div>
  )
}
