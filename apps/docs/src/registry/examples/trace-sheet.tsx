import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/registry/ui/sheet"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "~/registry/ui/trace"

export default function TraceSheet() {
  return (
    <Trace class="max-w-sm">
      <Sheet>
        <SheetTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="FolderSearchIcon" />
            </TraceIcon>
            <TraceTitle>Explored 4 files</TraceTitle>
            <TraceIcon>
              <IconPlaceholder lucide="ChevronRightIcon" />
            </TraceIcon>
          </TraceLine>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Explored 4 files</SheetTitle>
            <SheetDescription>
              Files read while preparing the response.
            </SheetDescription>
          </SheetHeader>
          <ul class="flex flex-col gap-2 px-6 font-mono text-xs">
            <li>apps/v4/lib/docs.ts</li>
            <li>apps/v4/lib/components.ts</li>
            <li>apps/v4/next.config.mjs</li>
            <li>apps/v4/package.json</li>
          </ul>
        </SheetContent>
      </Sheet>
    </Trace>
  )
}
