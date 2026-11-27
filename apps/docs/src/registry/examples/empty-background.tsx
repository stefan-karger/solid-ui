import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/ui/empty"

export default function EmptyBackground() {
  return (
    <Empty class="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconPlaceholder lucide="BellIcon" />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription class="max-w-xs text-pretty">
          You&apos;re all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <IconPlaceholder lucide="RefreshCcwIcon" />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
