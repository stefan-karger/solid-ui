import type { ComponentProps, JSX } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, CopyIcon } from "lucide-solid"
import { createSignal, For, omit, onCleanup } from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

const codeBlockVariants = cva(
  "cn-code-block group/code-block relative flex w-full min-w-0 flex-col overflow-hidden",
  {
    variants: {
      variant: {
        default: "cn-code-block-variant-default",
        destructive: "cn-code-block-variant-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const codeBlockLineVariants = cva(
  "cn-code-block-line relative block min-h-lh after:absolute after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  {
    variants: {
      variant: {
        default: "cn-code-block-line-variant-default",
        added: "cn-code-block-line-variant-added",
        removed: "cn-code-block-line-variant-removed",
        highlighted: "cn-code-block-line-variant-highlighted"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)
export function CodeBlockHeader(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="code-block-header"
      class={cn(
        "cn-code-block-header flex min-w-0 shrink-0 items-center *:has-[>[data-slot=code-block-title]]:min-w-0",
        props.class
      )}
    />
  )
}
export function CodeBlockTitle(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="code-block-title"
      class={cn(
        "cn-code-block-title min-w-0 truncate [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle",
        props.class
      )}
    />
  )
}
export function CodeBlockActions(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="code-block-actions"
      class={cn(
        "cn-code-block-actions ms-auto flex shrink-0 items-center [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100",
        props.class
      )}
    />
  )
}
export function CodeBlockFooter(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="code-block-footer"
      class={cn(
        "cn-code-block-footer flex min-w-0 shrink-0 items-center",
        props.class
      )}
    />
  )
}
export function CodeBlock(
  props: ComponentProps<"div"> &
    VariantProps<typeof codeBlockVariants> & { size?: "default" | "sm" }
) {
  const rest = omit(props, "class", "variant", "size")
  return (
    <div
      {...rest}
      data-slot="code-block"
      data-variant={props.variant ?? "default"}
      data-size={props.size ?? "default"}
      class={cn(codeBlockVariants({ variant: props.variant }), props.class)}
    />
  )
}

export function CodeBlockCopyButton(
  props: Omit<ButtonProps, "onClick"> & { value: string; onCopy?: () => void }
) {
  const rest = omit(props, "value", "onCopy", "children")
  const [copied, setCopied] = createSignal(false)
  const [failed, setFailed] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  onCleanup(() => clearTimeout(timer))
  async function copy() {
    try {
      await navigator.clipboard.writeText(props.value)
      setCopied(true)
      setFailed(false)
      props.onCopy?.()
      clearTimeout(timer)
      timer = setTimeout(() => setCopied(false), 2000)
    } catch {
      setFailed(true)
    }
  }
  return (
    <>
      <Button
        variant="ghost"
        size="icon-xs"
        {...rest}
        data-slot="code-block-copy-button"
        data-copied={copied() || undefined}
        aria-label={
          copied() ? "Copied" : failed() ? "Copy failed" : "Copy code"
        }
        onClick={copy}
      >
        {copied() ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <span aria-live="polite" class="sr-only">
        {copied() ? "Copied" : failed() ? "Copy failed" : ""}
      </span>
    </>
  )
}

export function CodeBlockContent(
  props: Omit<ComponentProps<"pre">, "style"> & {
    wrap?: boolean
    lineNumbers?: boolean
    startLine?: number
    style?: JSX.CSSProperties
  }
) {
  const rest = omit(
    props,
    "class",
    "children",
    "wrap",
    "lineNumbers",
    "startLine",
    "style"
  )
  return (
    <pre
      {...rest}
      data-slot="code-block-content"
      data-wrap={props.wrap || undefined}
      data-numbered={props.lineNumbers || undefined}
      dir="ltr"
      tabindex={0}
      style={{
        "counter-reset": "line " + ((props.startLine ?? 1) - 1),
        ...props.style
      }}
      class={cn(
        "cn-code-block-content min-h-0 min-w-0 overflow-auto text-start font-mono outline-none data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap",
        props.class
      )}
    >
      <code
        data-slot="code-block-code"
        class="cn-code-block-code grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
      >
        {typeof props.children === "string" && props.lineNumbers ? (
          <For each={props.children.replace(/\n$/, "").split("\n")}>
            {(line) => <CodeBlockLine>{line}</CodeBlockLine>}
          </For>
        ) : (
          props.children
        )}
      </code>
    </pre>
  )
}

export function CodeBlockLine(
  props: ComponentProps<"span"> & VariantProps<typeof codeBlockLineVariants>
) {
  const rest = omit(props, "class", "children", "variant")
  return (
    <span
      {...rest}
      data-slot="code-block-line"
      data-variant={props.variant ?? "default"}
      class={cn(codeBlockLineVariants({ variant: props.variant }), props.class)}
    >
      <span data-slot="code-block-line-content" class="min-w-0">
        {props.children === undefined ||
        props.children === null ||
        props.children === ""
          ? "\n"
          : props.children}
      </span>
    </span>
  )
}
