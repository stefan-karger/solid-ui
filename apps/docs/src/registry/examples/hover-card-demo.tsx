import { Button } from "~/registry/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/registry/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCard delay={10} closeDelay={100}>
      <HoverCardTrigger render={(part) => <Button {...part} variant="link" />}>
        Hover Here
      </HoverCardTrigger>
      <HoverCardContent class="flex w-64 flex-col gap-0.5">
        <div class="font-semibold">@nextjs</div>
        <div>The React Framework – created and maintained by @vercel.</div>
        <div class="mt-1 text-xs text-muted-foreground">Joined December 2021</div>
      </HoverCardContent>
    </HoverCard>
  )
}
