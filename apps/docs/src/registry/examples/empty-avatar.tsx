import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"
import { Button } from "~/registry/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/ui/empty"

export default function EmptyAvatar() {
  return (
    <Empty class="max-w-md border">
      <EmptyHeader>
        <EmptyMedia>
          <Avatar size="lg">
            <AvatarImage
              alt="@stefan-karger"
              class="grayscale"
              src="https://github.com/stefan-karger.png"
            />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave Message</Button>
      </EmptyContent>
    </Empty>
  )
}
