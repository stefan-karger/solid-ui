// Picker parts follow shadcn/ui 055aa6b, apps/v4/app/(app)/(create)/components/picker.tsx (MIT).
// The neutral overlay colors are swapped for the docs site's dark Solid palette.
import CheckIcon from "@lucide/solid/icons/check"
import { type ComponentProps } from "@solidjs/web"
import {
  MenuContent as SdkMenuContent,
  MenuGroupLabel as SdkMenuGroupLabel,
  MenuItemIndicator as SdkMenuItemIndicator,
  MenuRadioItem as SdkMenuRadioItem,
  MenuSeparator as SdkMenuSeparator,
  MenuTrigger as SdkMenuTrigger
} from "@ui-sdk/solid/menu"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type WithClass<T> = Omit<T, "class"> & { class?: string | undefined }

function PickerTrigger(
  props: WithClass<ComponentProps<typeof SdkMenuTrigger>>
) {
  return (
    <SdkMenuTrigger
      {...props}
      class={cn(
        "relative w-36 shrink-0 cursor-default touch-manipulation rounded-xl p-3 text-start ring-1 ring-foreground/10 select-none hover:bg-secondary/70 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50 md:w-full md:rounded-lg md:px-2.5 md:py-2 data-open:bg-secondary/70",
        props.class
      )}
    />
  )
}

function PickerContent(
  rawProps: WithClass<ComponentProps<typeof SdkMenuContent>>
) {
  const props = merge(
    { align: "start", side: "bottom", sideOffset: 20 } as const,
    rawProps
  )
  const others = omit(props, "class")
  return (
    <SdkMenuContent
      {...others}
      class={cn(
        // The popup renders inside the dark panel, so `html.dark` tells the site mode apart.
        "z-50 no-scrollbar max-h-(--available-height) w-[calc(var(--available-width)-(--spacing(6)))] min-w-32 origin-(--transform-origin) translate-y-2 overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-background/85 p-1.5 text-foreground ring-1 ring-white/10 backdrop-blur-xl outline-none md:w-52 data-closed:overflow-hidden [html.dark_&]:bg-popover/90 [html.dark_&]:ring-border",
        props.class
      )}
    />
  )
}

function PickerLabel(
  props: WithClass<ComponentProps<typeof SdkMenuGroupLabel>>
) {
  return (
    <SdkMenuGroupLabel
      {...props}
      class={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        props.class
      )}
    />
  )
}

function PickerRadioItem(
  props: WithClass<ComponentProps<typeof SdkMenuRadioItem>>
) {
  const others = omit(props, "class", "children")
  return (
    <SdkMenuRadioItem
      {...others}
      class={cn(
        "relative flex cursor-default items-center gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm font-medium text-foreground outline-hidden select-none data-highlighted:bg-primary/20 pointer-coarse:gap-3 pointer-coarse:py-2.5 pointer-coarse:pl-3 pointer-coarse:text-base data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        props.class
      )}
    >
      <span class="pointer-events-none absolute right-2 flex items-center justify-center text-accent-foreground">
        <SdkMenuItemIndicator>
          <CheckIcon class="size-4 pointer-coarse:size-5" />
        </SdkMenuItemIndicator>
      </span>
      {props.children}
    </SdkMenuRadioItem>
  )
}

function PickerSeparator(
  props: WithClass<ComponentProps<typeof SdkMenuSeparator>>
) {
  return (
    <SdkMenuSeparator
      {...props}
      class={cn("-mx-1.5 my-1.5 h-px bg-border", props.class)}
    />
  )
}

export {
  PickerContent,
  PickerLabel,
  PickerRadioItem,
  PickerSeparator,
  PickerTrigger
}
