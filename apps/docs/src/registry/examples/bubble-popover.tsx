// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.

import { Bubble, BubbleContent, BubbleReactions } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "~/registry/ui/popover"

export default function BubblePopoverDemo() {
  return (
    <div class="flex w-full max-w-sm flex-col gap-4 py-12">
      <Bubble align="end">
        <BubbleContent>Run the build script.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Failed to run the command.</BubbleContent>
        <BubbleReactions>
          <Popover>
            <PopoverTrigger
              render={(partProps) => (
                <Button
                  {...partProps}
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Show error details"
                  class="aria-expanded:text-destructive"
                >
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
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </Button>
              )}
            />
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle class="text-sm">
                  Command failed with exit code 1
                </PopoverTitle>
                <PopoverDescription class="text-sm">
                  ENOENT: no such file or directory, open pnpm-lock.yaml
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
