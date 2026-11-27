import { createSignal, For, onCleanup, Show } from "solid-js"

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

const blocks: {
  title?: string
  language: string
  code: string
  lineNumbers?: boolean
  highlight?: number[]
  diff?: boolean
}[] = [
  {
    title: "hooks/use-debounce.ts",
    language: "ts",
    lineNumbers: true,
    code: `export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}`
  },
  {
    language: "bash",
    code: "npx solidui-cli@latest add code-block"
  },
  {
    title: "components/search.tsx",
    language: "tsx",
    lineNumbers: true,
    diff: true,
    code: ` export function Search() {
   const [query, setQuery] = React.useState("")
-  const results = useSearch(query)
+  const debounced = useDebounce(query, 300)
+  const results = useSearch(debounced)

   return <SearchResults results={results} />
 }`
  },
  {
    title: "app/api/chat/route.ts",
    language: "ts",
    lineNumbers: true,
    highlight: [5, 6, 7, 8],
    code: `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`
  },
  {
    title: ".env.local",
    language: "bash",
    code: "AI_GATEWAY_API_KEY=your-api-key"
  }
]

// Where each block starts in the stream.
const offsets = blocks.map((_, index) =>
  blocks.slice(0, index).reduce((total, block) => total + block.code.length, 0)
)
const total = blocks.reduce((sum, block) => sum + block.code.length, 0)

function StreamingBlock(props: {
  block: (typeof blocks)[number]
  code: string
}) {
  const rows = () => props.code.split("\n")
  const source = () =>
    props.block.diff
      ? rows()
          .map((row) => row.slice(1))
          .join("\n")
      : props.code
  const lines = useHighlightedCode(source, () => props.block.language)

  function variant(index: number) {
    if (props.block.diff) {
      const prefix = rows()[index]?.[0]
      if (prefix === "+") return "added"
      if (prefix === "-") return "removed"
    }
    return props.block.highlight?.includes(index) ? "highlighted" : "default"
  }

  return (
    <CodeBlock>
      <Show when={props.block.title}>
        <CodeBlockHeader>
          <CodeBlockTitle>{props.block.title}</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton
              value={source()}
              disabled={props.code.length < props.block.code.length}
            />
          </CodeBlockActions>
        </CodeBlockHeader>
      </Show>
      <CodeBlockContent lineNumbers={props.block.lineNumbers ?? false}>
        <For each={lines()}>
          {(line, index) => (
            <CodeBlockLine variant={variant(index())}>{line}</CodeBlockLine>
          )}
        </For>
      </CodeBlockContent>
    </CodeBlock>
  )
}

export default function CodeBlockStreaming() {
  const [length, setLength] = createSignal(total)
  let timer: ReturnType<typeof setInterval> | undefined
  onCleanup(() => clearInterval(timer))

  function replay() {
    setLength(0)
    let position = 0
    timer = setInterval(() => {
      position = Math.min(total, position + 6)
      setLength(position)
      if (position === total) clearInterval(timer)
    }, 32)
  }

  return (
    <div class="flex w-full max-w-md flex-col gap-4">
      <For each={blocks}>
        {(block, index) => {
          const shown = () => length() - (offsets[index()] ?? 0)
          return (
            <Show when={shown() > 0}>
              <StreamingBlock
                block={block}
                code={block.code.slice(0, shown())}
              />
            </Show>
          )
        }}
      </For>
      <Button
        variant="outline"
        size="sm"
        class="self-start"
        disabled={length() < total}
        onClick={replay}
      >
        <IconPlaceholder lucide="RotateCcwIcon" />
        Replay
      </Button>
    </div>
  )
}
