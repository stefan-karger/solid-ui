import { Button } from "~/registry/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/ui/empty"
import { Spinner } from "~/registry/ui/spinner"

export default function SpinnerEmpty() {
  return (
    <Empty class="w-full">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Spinner class="size-6" />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}
