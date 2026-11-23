import type { ComponentProps } from "@solidjs/web"
import {
  CheckIcon,
  CopyIcon,
  PencilIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon
} from "lucide-solid"
import { createSignal, createEffect, createMemo } from "solid-js"

import { Markdown } from "~/registry/lib/ai-demo-markdown"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { Message, MessageContent, MessageFooter } from "~/registry/ui/message"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

const reply = `Install Dialog, then open it from the gear button in \`site-header.tsx\`.

\`\`\`bash
npx solidui-cli@latest add dialog
\`\`\`

Wrap the button in a \`DialogTrigger\` and put the settings form in \`DialogContent\`. Focus moves into the dialog when it opens, and **Esc** closes it.`

export default function MessagePattern() {
  const [copied, setCopied] = createSignal(false)
  const [feedback, setFeedback] = createSignal<"like" | "dislike" | null>(null)

  createEffect(
    () => copied(),
    (isCopied) => {
      if (!isCopied) return
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  )

  return (
    <div class="mx-auto flex w-full max-w-md flex-col gap-8 py-6 text-sm">
      <Message align="end">
        <MessageContent class="gap-2">
          <Bubble align="end" variant="muted">
            <BubbleContent>
              How do I add a settings dialog? It should open from the gear icon
              in the header.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <MessageAction label="Copy">
              <CopyIcon />
            </MessageAction>
            <MessageAction label="Edit">
              <PencilIcon />
            </MessageAction>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent class="gap-2">
          <Markdown>{reply}</Markdown>
          <MessageFooter class="px-0">
            <MessageAction
              label={copied() ? "Copied" : "Copy"}
              onClick={() => {
                navigator.clipboard.writeText(reply)
                setCopied(true)
              }}
            >
              {copied() ? <CheckIcon /> : <CopyIcon />}
            </MessageAction>
            <MessageAction
              label="Good response"
              aria-pressed={feedback() === "like"}
              onClick={() => setFeedback(feedback() === "like" ? null : "like")}
            >
              <ThumbsUpIcon
                class={feedback() === "like" ? "fill-current" : ""}
              />
            </MessageAction>
            <MessageAction
              label="Bad response"
              aria-pressed={feedback() === "dislike"}
              onClick={() =>
                setFeedback(feedback() === "dislike" ? null : "dislike")
              }
            >
              <ThumbsDownIcon
                class={feedback() === "dislike" ? "fill-current" : ""}
              />
            </MessageAction>
            <MessageAction label="Retry">
              <RefreshCcwIcon />
            </MessageAction>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}

function MessageAction(
  componentProps: ComponentProps<typeof Button> & { label: string }
) {
  const content = createMemo(() => {
    const { label, children, ...props } = componentProps
    return (
      <Tooltip>
        <TooltipTrigger
          render={(triggerProps) => (
            <Button
              {...triggerProps}
              variant="ghost"
              size="icon-sm"
              aria-label={label}
              {...props}
            >
              {children}
            </Button>
          )}
        />
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    )
  })
  return <>{content()}</>
}
