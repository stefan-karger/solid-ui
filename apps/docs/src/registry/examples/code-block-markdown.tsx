// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { createSignal, For, onCleanup, Show } from "solid-js"

import { useHighlightedCode } from "~/registry/hooks/use-highlighted-code"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
} from "~/registry/ui/code-block"
import { Message, MessageContent } from "~/registry/ui/message"

const code = `import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js"

export function useDebounce<T>(value: Accessor<T>, delay = 300) {
  const [debounced, setDebounced] = createSignal(value())

  createEffect(() => value(), (next) => {
    const timeout = setTimeout(() => setDebounced(() => next), delay)
    onCleanup(() => clearTimeout(timeout))
  })

  return debounced
}`

export default function CodeBlockMarkdown() {
  const [position, setPosition] = createSignal(code.length)
  const ready = () => position() === code.length
  const lines = useHighlightedCode(
    () => code.slice(0, position()),
    () => "tsx"
  )
  let timer: ReturnType<typeof setInterval> | undefined
  onCleanup(() => clearInterval(timer))

  function replay() {
    setPosition(0)
    let offset = 0
    timer = setInterval(() => {
      offset = Math.min(code.length, offset + 5)
      setPosition(offset)
      if (offset === code.length) clearInterval(timer)
    }, 30)
  }

  return (
    <div class="flex min-h-112 w-full max-w-md flex-col gap-4 py-6 text-start text-sm">
      <Message align="end">
        <MessageContent>
          <Bubble align="end" variant="muted">
            <BubbleContent>
              How do I debounce a search input in Solid?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <p>
            Wrap the value in a <code>useDebounce</code> hook. It returns the
            latest value once it stops changing for <code>delay</code>{" "}
            milliseconds.
          </p>
          <CodeBlock>
            <CodeBlockHeader>
              <CodeBlockTitle>tsx</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value={code} disabled={!ready()} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent>
              <For each={lines()}>
                {(line) => <CodeBlockLine>{line}</CodeBlockLine>}
              </For>
            </CodeBlockContent>
          </CodeBlock>
          <Show when={ready()}>
            <p>
              Pass the debounced value to your fetch instead of the raw input.
            </p>
          </Show>
        </MessageContent>
      </Message>
      <Show when={ready()}>
        <Button
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          onClick={replay}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>{" "}
          Replay
        </Button>
      </Show>
    </div>
  )
}
