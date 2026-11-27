import { createSignal, For } from "solid-js"

import { useHighlightedCode } from "~/registry/hooks/use-highlighted-code"
import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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

const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a helpful assistant. Answer in one short paragraph.",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function CodeBlockDemo() {
  const [wrap, setWrap] = createSignal(false)
  const lines = useHighlightedCode(
    () => code,
    () => "ts"
  )

  return (
    <div class="w-full max-w-lg">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <IconPlaceholder lucide="FileCodeIcon" />
            app/api/chat/route.ts
          </CodeBlockTitle>
          <CodeBlockActions>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Wrap lines"
              aria-pressed={wrap() ? "true" : "false"}
              class="aria-pressed:text-foreground"
              onClick={() => setWrap(!wrap())}
            >
              <IconPlaceholder lucide="TextWrapIcon" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Download"
              onClick={() => download(code, "route.ts")}
            >
              <IconPlaceholder lucide="DownloadIcon" />
            </Button>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent wrap={wrap()} lineNumbers>
          <For each={lines()}>
            {(line, index) => (
              <CodeBlockLine
                variant={
                  index() >= 5 && index() <= 9 ? "highlighted" : "default"
                }
              >
                {line}
              </CodeBlockLine>
            )}
          </For>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
