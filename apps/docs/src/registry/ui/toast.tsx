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
import {
  CircleCheckIcon,
  InfoIcon,
  LoaderCircleIcon,
  OctagonXIcon,
  TriangleAlertIcon
} from "lucide-solid"
import { Match, Switch } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"

export { toast, createToaster } from "@ui-sdk/solid/toast"

function ToastIcon(props: { type: ToastType }) {
  return (
    <Switch>
      <Match when={props.type === "success"}>
        <CircleCheckIcon
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0"
        />
      </Match>
      <Match when={props.type === "info"}>
        <InfoIcon
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0"
        />
      </Match>
      <Match when={props.type === "warning"}>
        <TriangleAlertIcon
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0"
        />
      </Match>
      <Match when={props.type === "error"}>
        <OctagonXIcon
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0"
        />
      </Match>
      <Match when={props.type === "loading"}>
        <LoaderCircleIcon
          data-slot="toast-icon"
          aria-hidden="true"
          class="size-4 shrink-0 motion-safe:animate-spin"
        />
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
