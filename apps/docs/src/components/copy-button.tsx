import { type ComponentProps, createEffect, createSignal, mergeProps, splitProps } from "solid-js"

import { VariantProps } from "class-variance-authority"

import { IconCheck, IconCopy } from "~/components/icons"
import { cn } from "~/lib/utils"
import { Button } from "~/registry/v1/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/v1/ui/tooltip"

type CopyButtonProps = ComponentProps<typeof Button> & { value: string; tooltip?: string }

export function CopyButton(rawProps: CopyButtonProps) {
  const props = mergeProps(rawProps, {
    variant: "ghost",
    tooltip: "Copy to Clipboard"
  })

  const [local, other] = splitProps(props as CopyButtonProps, [
    "class",
    "variant",
    "tooltip",
    "value"
  ])
  const [hasCopied, setHasCopied] = createSignal(false)

  createEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  })

  return (
    <Tooltip>
      <Button
        as={TooltipTrigger}
        class={cn(
          "absolute top-3 right-2 z-10 size-7 bg-code hover:opacity-100 focus-visible:opacity-100",
          local.class
        )}
        data-copied={hasCopied()}
        data-slot="copy-button"
        onClick={() => {
          navigator.clipboard.writeText(local.value)
          setHasCopied(true)
        }}
        size="icon"
        variant={local.variant}
        {...other}
      >
        <span class="sr-only">Copy</span>
        {hasCopied() ? <IconCheck /> : <IconCopy />}
      </Button>

      <TooltipContent>{hasCopied() ? "Copied" : local.tooltip}</TooltipContent>
    </Tooltip>
  )
}
