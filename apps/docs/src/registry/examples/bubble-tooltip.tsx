import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Bubble, BubbleContent, BubbleReactions } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function BubbleTooltipDemo() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-4 py-12">
      <Bubble variant="secondary">
        <BubbleContent>Did you remove the stale route?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Yes, removed it from the registry.</BubbleContent>
        <BubbleReactions class="p-0">
          <Tooltip>
            <TooltipTrigger
              render={(partProps) => (
                <Button {...partProps} variant="ghost" size="icon-xs">
                  <IconPlaceholder lucide="CheckIcon" />
                </Button>
              )}
            />
            <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
          </Tooltip>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
