import { toast } from "solid-sonner"

import { Bubble, BubbleContent, BubbleGroup } from "~/registry/ui/bubble"

export default function BubbleLinkButton() {
  const notify = (description: string) => toast.success(description)

  return (
    <div class="flex w-full max-w-sm flex-col gap-4 py-12">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble align="end" variant="tinted">
          <BubbleContent
            as="button"
            onClick={() => notify("You clicked forgot password")}
            type="button"
          >
            I forgot my password
          </BubbleContent>
        </Bubble>
        <Bubble align="end" variant="tinted">
          <BubbleContent
            as="button"
            onClick={() => notify("You clicked help with subscription")}
            type="button"
          >
            I need help with my subscription
          </BubbleContent>
        </Bubble>
        <Bubble align="end" variant="tinted">
          <BubbleContent
            as="button"
            onClick={() => notify("You clicked something else. Talk to a human.")}
            type="button"
          >
            Something else. Talk to a human.
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  )
}
