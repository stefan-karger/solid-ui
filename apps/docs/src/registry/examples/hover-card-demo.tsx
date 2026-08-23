import { Button } from "~/registry/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/registry/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCard closeDelay={100} openDelay={10} placement="bottom">
      <HoverCardTrigger as={Button<"button">} variant="link">
        Hover Here
      </HoverCardTrigger>
      <HoverCardContent class="flex w-64 flex-col gap-0.5">
        <div class="font-semibold">@nextjs</div>
        <div>The React Framework – created and maintained by @vercel.</div>
        <div class="mt-1 text-muted-foreground text-xs">Joined December 2021</div>
      </HoverCardContent>
    </HoverCard>
  )
}
