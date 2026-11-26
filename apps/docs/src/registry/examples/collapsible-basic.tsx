// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "~/registry/ui/collapsible"

export default function CollapsibleBasic() {
  return (
    <Collapsible class="w-full max-w-sm rounded-md border" defaultOpen>
      <CollapsibleTrigger class="group/collapsible-trigger flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-muted/50">
        <span>Can I use this component in my project?</span>
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
          class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[expanded]/collapsible-trigger:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </CollapsibleTrigger>
      <CollapsibleContent class="px-4 pb-4 text-sm text-muted-foreground">
        Yes. It is built with UI SDK components, so it supports keyboard
        navigation and controlled or uncontrolled state.
      </CollapsibleContent>
    </Collapsible>
  )
}
