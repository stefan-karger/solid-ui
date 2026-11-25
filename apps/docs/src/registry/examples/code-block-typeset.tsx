// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For } from "solid-js"

import { useHighlightedCode } from "~/registry/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
} from "~/registry/ui/code-block"

const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
}`

export default function CodeBlockTypeset() {
  const lines = useHighlightedCode(
    () => code,
    () => "ts"
  )

  return (
    <div class="grid w-full max-w-md gap-3 text-start text-sm">
      <h3 class="font-semibold">Stream a response</h3>
      <p>
        Create a route handler that calls <code>streamText</code> and returns
        the stream to the client.
      </p>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
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
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
              <path d="M10 12.5 8 15l2 2.5" />
              <path d="m14 12.5 2 2.5-2 2.5" />
            </svg>
            app/api/chat/route.ts
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent lineNumbers>
          <For each={lines()}>
            {(line) => <CodeBlockLine>{line}</CodeBlockLine>}
          </For>
        </CodeBlockContent>
      </CodeBlock>
      <p>
        The <code>useChat</code> hook reads the stream on the client and renders
        the answer while it is written.
      </p>
    </div>
  )
}
