import { FileCodeIcon, FileTextIcon, TableIcon, XIcon } from "lucide-solid";
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "~/registry/ui/attachment";

type Item = {
  name: string;
  meta: string;
  icon?: Component;
  src?: string;
};

const items: Item[] = [
  { name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", icon: FileTextIcon },
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
  },
  { name: "customers.csv", meta: "CSV · 18 KB", icon: TableIcon },
  { name: "renderer.tsx", meta: "TSX · 12 KB", icon: FileCodeIcon },
];

export default function AttachmentGroupDemo() {
  return (
    <div class="mx-auto w-full max-w-sm py-12">
      <AttachmentGroup class="w-full">
        <For each={items}>
          {(item) => (
            <Attachment class="w-64">
              <Show
                when={item.src}
                fallback={
                  <Show when={item.icon}>
                    {(Icon) => (
                      <AttachmentMedia>
                        <Dynamic component={Icon()} />
                      </AttachmentMedia>
                    )}
                  </Show>
                }
              >
                {(src) => (
                  <AttachmentMedia variant="image">
                    <img src={src()} alt={item.name} />
                  </AttachmentMedia>
                )}
              </Show>
              <AttachmentContent>
                <AttachmentTitle>{item.name}</AttachmentTitle>
                <AttachmentDescription>{item.meta}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remove ${item.name}`}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )}
        </For>
      </AttachmentGroup>
    </div>
  );
}