import { Bubble, BubbleContent, BubbleGroup } from "~/registry/ui/bubble";

export default function BubbleGrouped() {
  return (
    <div class="flex w-full max-w-md flex-col gap-8">
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
        <Bubble variant="tinted" align="end">
          <BubbleContent>Yes, clean that up.</BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent>Then rerun the registry build.</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  );
}
