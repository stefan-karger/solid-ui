import { Avatar, AvatarFallback, AvatarImage } from "~/registry/new-york-v4/ui/avatar"
import { Button } from "~/registry/new-york-v4/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/registry/new-york-v4/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <Button as={HoverCardTrigger} variant="link">
        @solidjs
      </Button>
      <HoverCardContent class="w-80">
        <div class="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/solidjs.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div class="space-y-1">
            <h4 class="font-semibold text-sm">@solidjs</h4>
            <p class="text-sm">The SolidJS Framework – created and maintained by @SolidJS Team.</p>
            <div class="text-muted-foreground text-xs">Joined June 2021</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
