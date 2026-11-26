// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps } from "@solidjs/web"
import {
  Toast as SdkToast,
  ToastRegion as SdkToastRegion,
  ToastTitle as SdkToastTitle,
  ToastDescription as SdkToastDescription,
  ToastAction as SdkToastAction,
  ToastClose as SdkToastClose,
  type ToastType
} from "@ui-sdk/solid/toast"
import { Match, Switch } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"

export { toast, createToaster } from "@ui-sdk/solid/toast"

function ToastIcon(props: { type: ToastType }) {
  return (
    <Switch>
      <Match when={props.type === "success"}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m16 9-5.5 5.5L8 12" />
        </svg>
      </Match>
      <Match when={props.type === "info"}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </Match>
      <Match when={props.type === "warning"}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      </Match>
      <Match when={props.type === "error"}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0"
        >
          <path d="m15 9-6 6" />
          <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
          <path d="m9 9 6 6" />
        </svg>
      </Match>
      <Match when={props.type === "loading"}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0 motion-safe:animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </Match>
    </Switch>
  )
}

export function Toaster(
  props: Omit<ComponentProps<typeof SdkToastRegion>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkToastRegion
      expanded
      side="top"
      align="center"
      {...props}
      class={cn(
        "group/toaster fixed z-100 m-4 h-[calc(var(--toast-stack-height)+(var(--toast-count)-1)*0.75rem)] w-[min(24rem,calc(100vw-2rem))] outline-none data-[align=center]:left-1/2 data-[align=center]:mx-0 data-[align=center]:-translate-x-1/2 data-[align=end]:end-0 data-[align=start]:start-0 data-[side=bottom]:bottom-0 data-[side=top]:top-0",
        props.class
      )}
    >
      {(item) => (
        <SdkToast class="cn-toast absolute inset-x-0 flex h-(--toast-height) [translate:var(--toast-swipe-x,0px)_calc(-1*var(--offset)+var(--toast-swipe-y,0px))] items-center gap-3 border bg-popover p-4 text-popover-foreground shadow-lg transition-[translate,opacity] duration-200 outline-none select-none [--offset:calc(var(--toast-offset)+var(--toast-index)*0.75rem)] group-data-[side=bottom]/toaster:bottom-0 group-data-[side=top]/toaster:top-0 group-data-[side=top]/toaster:[translate:var(--toast-swipe-x,0px)_calc(var(--offset)+var(--toast-swipe-y,0px))] data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:transition-none">
          <ToastIcon type={item.type} />
          <div class="min-w-0 flex-1">
            <SdkToastTitle class="text-sm font-medium" />
            <SdkToastDescription class="text-sm text-muted-foreground" />
          </div>
          <SdkToastAction
            render={(part) => <Button {...part} variant="outline" size="sm" />}
          />
          {item.cancel && (
            <SdkToastClose
              action={(event, details) =>
                item.cancel?.onCancel?.(event, details)
              }
              render={(part) => <Button {...part} variant="ghost" size="sm" />}
            >
              {item.cancel.label}
            </SdkToastClose>
          )}
        </SdkToast>
      )}
    </SdkToastRegion>
  )
}
