import { Show } from "solid-js"
import { A } from "@solidjs/router"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/registry/ui/badge"

import { IconExternalLink } from "./icons"

type HeaderProps = {
  title: string
  description: string
  docs?: string
}

export function MDXHeader(props: HeaderProps) {
  return (
    <div class="space-y-2 pb-8">
      <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">{props.title}</h1>
      <p class="text-balance text-lg text-muted-foreground">{props.description}</p>
      <Show when={props.docs}>
        {(docs) => (
          <A
            href={docs()}
            target="_blank"
            rel="noreferrer"
            class={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
          >
            Docs
            <IconExternalLink class="size-3" />
          </A>
        )}
      </Show>
    </div>
  )
}
