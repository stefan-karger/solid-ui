import { FileCodeIcon } from "lucide-solid"
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
        Create a route handler that calls <code>streamText</code> and returns the stream to the
        client.
      </p>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <FileCodeIcon />
            app/api/chat/route.ts
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent lineNumbers>
          <For each={lines()}>{(line) => <CodeBlockLine>{line}</CodeBlockLine>}</For>
        </CodeBlockContent>
      </CodeBlock>
      <p>
        The <code>useChat</code> hook reads the stream on the client and renders the answer while it
        is written.
      </p>
    </div>
  )
}
