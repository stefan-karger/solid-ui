import { CalendarDays } from "lucide-solid"

import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"
import { Button } from "~/registry/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/registry/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger as={Button<"button">} variant="link">
        @nextjs
      </HoverCardTrigger>
      <HoverCardContent class="w-80">
        <div class="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div class="space-y-1">
            <h4 class="font-semibold text-sm">@nextjs</h4>
            <p class="text-sm">The React Framework – created and maintained by @vercel.</p>
            <div class="flex items-center pt-2">
              <CalendarDays class="mr-2 size-4 opacity-70" />
              <span class="text-muted-foreground text-xs">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
