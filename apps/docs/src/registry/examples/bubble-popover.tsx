import { InfoIcon } from "lucide-solid";
import { Bubble, BubbleContent, BubbleReactions } from "~/registry/ui/bubble";
import { Button } from "~/registry/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "~/registry/ui/popover";

export default function BubblePopover() {
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
              as={Button}
              variant="ghost"
              size="icon-xs"
              aria-label="Show error details"
              class="aria-expanded:text-destructive"
            >
              <InfoIcon />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle class="text-sm">Command failed with exit code 1</PopoverTitle>
                <PopoverDescription class="text-sm">
                  ENOENT: no such file or directory, open pnpm-lock.yaml
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </BubbleReactions>
      </Bubble>
    </div>
  );
}
