import { Bubble, BubbleContent, BubbleGroup } from "~/registry/ui/bubble"

export default function BubbleGrouped() {
  return (
    <div class="flex w-full max-w-md flex-col gap-4">
      <BubbleGroup>
        <Bubble variant="secondary">
          <BubbleContent>I finished the audit pass.</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>
            The registry output looks clean, but I found one stale route.
          </BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>Want me to remove it now?</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <BubbleGroup>
        <Bubble align="end" variant="tinted">
          <BubbleContent>Yes, clean that up.</BubbleContent>
        </Bubble>
        <Bubble align="end" variant="tinted">
          <BubbleContent>Then rerun the registry build.</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  )
}
