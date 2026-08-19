import { type JSX } from "solid-js";
import { Bubble, BubbleContent, BubbleReactions } from "~/registry/ui/bubble";


export default function BubbleWithReactions() {
  return (
    <div class="flex w-full max-w-md flex-col gap-8">
      <GalleryMarker>side=bottom align=end</GalleryMarker>
      <Bubble>
        <BubbleContent>This is a one line message.</BubbleContent>
        <BubbleReactions side="bottom" align="end" role="img" aria-label="Reaction: thumbs up">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset is easier to inspect.
        </BubbleContent>
        <BubbleReactions
          side="bottom"
          align="end"
          role="img"
          aria-label="Reactions: thumbs up, surprised"
        >
          <span>👍</span>
          <span>😮</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset is easier to inspect.
        </BubbleContent>
        <BubbleReactions
          side="bottom"
          align="end"
          role="img"
          aria-label="Reactions: thumbs up, surprised, fire, eyes, and 8 more"
        >
          <span>👍</span>
          <span>😮</span>
          <span>🔥</span>
          <span>👀</span>
          <span>+8</span>
        </BubbleReactions>
      </Bubble>
      <GalleryMarker>side=bottom align=start</GalleryMarker>
      <Bubble variant="secondary">
        <BubbleContent>This is a one line message.</BubbleContent>
        <BubbleReactions side="bottom" align="start" role="img" aria-label="Reaction: fire">
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset is easier to inspect.
        </BubbleContent>
        <BubbleReactions
          side="bottom"
          align="start"
          role="img"
          aria-label="Reactions: thumbs up, surprised, fire, eyes"
        >
          <span>👍</span>
          <span>😮</span>
          <span>🔥</span>
          <span>👀</span>
        </BubbleReactions>
      </Bubble>
      <GalleryMarker>side=top align=start</GalleryMarker>
      <Bubble variant="secondary">
        <BubbleContent>This is a one line message.</BubbleContent>
        <BubbleReactions side="top" align="start" role="img" aria-label="Reaction: fire">
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset is easier to inspect.
        </BubbleContent>
        <BubbleReactions
          side="top"
          align="start"
          role="img"
          aria-label="Reactions: thumbs up, surprised, fire, eyes"
        >
          <span>👍</span>
          <span>😮</span>
          <span>🔥</span>
          <span>👀</span>
        </BubbleReactions>
      </Bubble>
      <GalleryMarker>side=bottom align=end</GalleryMarker>
      <Bubble variant="muted">
        <BubbleContent>This is a one line message.</BubbleContent>
        <BubbleReactions side="top" align="end" role="img" aria-label="Reaction: thumbs up">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="muted" align="end">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset.
        </BubbleContent>
        <BubbleReactions
          side="top"
          align="end"
          role="img"
          aria-label="Reactions: thumbs up, surprised, fire, eyes"
          class="px-1.5 py-0.5"
        >
          <span>👍</span>
          <span>😮</span>
          <span>🔥</span>
          <span>👀</span>
        </BubbleReactions>
      </Bubble>
    </div>
  );
}

function GalleryMarker(props: { children: JSX.Element }) {
  return (
    <div
      data-slot="marker"
      data-variant="separator"
      class="z-marker z-marker-variant-separator group/marker relative flex w-full items-center"
    >
      <span data-slot="marker-content" class="z-marker-content min-w-0 wrap-break-word">
        {props.children}
      </span>
    </div>
  );
}
