import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { Message, MessageContent, MessageFooter } from "~/registry/ui/message"

export default function MessageActionsDemo() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              The install failure is coming from the workspace package.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
              <IconPlaceholder lucide="CopyIcon" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Like" title="Like">
              <IconPlaceholder lucide="ThumbsUpIcon" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Dislike"
              title="Dislike"
            >
              <IconPlaceholder lucide="ThumbsDownIcon" />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
          </Bubble>
          <MessageFooter class="gap-2">
            <span class="font-normal text-destructive">Failed to send</span>
            <Button
              variant="ghost"
              size="icon-xs"
              title="Retry"
              aria-label="Retry"
            >
              <IconPlaceholder lucide="RefreshCcwIcon" />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
