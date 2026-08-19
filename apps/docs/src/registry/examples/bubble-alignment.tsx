import { Bubble, BubbleContent } from "~/registry/ui/bubble";

export default function BubbleAlignment() {
  return (
    <div class="flex w-full max-w-md flex-col gap-4">
      <Bubble variant="muted">
        <BubbleContent>This bubble is aligned to the start.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>This bubble is aligned to the end.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          This multiline bubble is aligned to the start. The corners should adjust when the text
          wraps to show the grouped side of the conversation.
        </BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>
          This multiline bubble is aligned to the end. It should sit on the opposite side with the
          matching corner radius for wrapped text.
        </BubbleContent>
      </Bubble>
    </div>
  );
}
