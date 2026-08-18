import { toast } from "solid-sonner";
import { Bubble, BubbleContent, BubbleGroup } from "~/registry/ui/bubble";
import { Toaster } from "~/registry/ui/toast";

export default function BubbleLinkButton() {
  const notify = (description: string) => toast.success(description);

  return (
    <>
      <Toaster />
      <div class="flex w-full max-w-sm flex-col gap-8 py-12">
        <Bubble variant="muted">
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
        <BubbleGroup>
          <Bubble variant="tinted" align="end">
            <BubbleContent
              as="button"
              type="button"
              onClick={() => notify("You clicked forgot password")}
            >
              I forgot my password
            </BubbleContent>
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent
              as="button"
              type="button"
              onClick={() => notify("You clicked help with subscription")}
            >
              I need help with my subscription
            </BubbleContent>
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent
              as="button"
              type="button"
              onClick={() => notify("You clicked something else. Talk to a human.")}
            >
              Something else. Talk to a human.
            </BubbleContent>
          </Bubble>
        </BubbleGroup>
      </div>
    </>
  );
}
