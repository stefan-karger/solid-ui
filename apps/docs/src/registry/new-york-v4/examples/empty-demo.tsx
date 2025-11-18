import { IconArrowUpRight, IconFolderCode } from "~/components/icons"
import { Button } from "~/registry/new-york-v4/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/new-york-v4/ui/empty"

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div class="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button as="a" class="text-muted-foreground" href="#" size="sm" variant="link">
        Learn More <IconArrowUpRight />
      </Button>
    </Empty>
  )
}
