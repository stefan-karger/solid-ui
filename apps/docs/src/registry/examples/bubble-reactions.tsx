import type { JSX } from "solid-js"

import { Bubble, BubbleContent, BubbleReactions } from "~/registry/ui/bubble"

export default function BubbleWithReactions() {
  return (
    <div class="flex w-full max-w-md flex-col gap-8">
      <GalleryMarker>side=bottom align=end</GalleryMarker>
      <Bubble>
        <BubbleContent>This is a one line message.</BubbleContent>
        <BubbleReactions align="end" aria-label="Reaction: thumbs up" role="img" side="bottom">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end" variant="secondary">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset is easier to inspect.
        </BubbleContent>
        <BubbleReactions
          align="end"
          aria-label="Reactions: thumbs up, surprised"
          role="img"
          side="bottom"
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
          align="end"
          aria-label="Reactions: thumbs up, surprised, fire, eyes, and 8 more"
          role="img"
          side="bottom"
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
        <BubbleReactions align="start" aria-label="Reaction: fire" role="img" side="bottom">
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end" variant="secondary">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset is easier to inspect.
        </BubbleContent>
        <BubbleReactions
          align="start"
          aria-label="Reactions: thumbs up, surprised, fire, eyes"
          role="img"
          side="bottom"
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
        <BubbleReactions align="start" aria-label="Reaction: fire" role="img" side="top">
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end" variant="secondary">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset is easier to inspect.
        </BubbleContent>
        <BubbleReactions
          align="start"
          aria-label="Reactions: thumbs up, surprised, fire, eyes"
          role="img"
          side="top"
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
        <BubbleReactions align="end" aria-label="Reaction: thumbs up" role="img" side="top">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end" variant="muted">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset.
        </BubbleContent>
        <BubbleReactions
          align="end"
          aria-label="Reactions: thumbs up, surprised, fire, eyes"
          class="px-1.5 py-0.5"
          role="img"
          side="top"
        >
          <span>👍</span>
          <span>😮</span>
          <span>🔥</span>
          <span>👀</span>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}

function GalleryMarker(props: { children: JSX.Element }) {
  return (
    <div
      class="group/marker relative z-marker z-marker-variant-separator flex w-full items-center"
      data-slot="marker"
      data-variant="separator"
    >
      <span class="wrap-break-word z-marker-content min-w-0" data-slot="marker-content">
        {props.children}
      </span>
    </div>
  )
}
