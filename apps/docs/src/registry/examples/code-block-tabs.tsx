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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs"

const files = [
  {
    id: "route",
    title: "app/api/chat/route.ts",
    language: "ts",
    code: `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
}`
  },
  {
    id: "chat",
    title: "components/chat.tsx",
    language: "tsx",
    code: `"use client"

import { useChat } from "@ai-sdk/react"

export function Chat() {
  const { messages } = useChat()

  return <MessageList messages={messages} />
}`
  },
  {
    id: "env",
    title: ".env.local",
    language: "bash",
    code: "AI_GATEWAY_API_KEY=your-api-key"
  }
]

function FileCode(props: { code: string; language: string }) {
  const lines = useHighlightedCode(
    () => props.code,
    () => props.language
  )

  return (
    <CodeBlockContent lineNumbers>
      <For each={lines()}>
        {(line) => <CodeBlockLine>{line}</CodeBlockLine>}
      </For>
    </CodeBlockContent>
  )
}

export default function CodeBlockTabs() {
  return (
    <Tabs defaultValue="route" class="w-full max-w-md">
      <TabsList>
        <For each={files}>
          {(file) => (
            <TabsTrigger value={file.id}>
              {file.title.split("/").at(-1)}
            </TabsTrigger>
          )}
        </For>
      </TabsList>
      <For each={files}>
        {(file) => (
          <TabsContent value={file.id}>
            <CodeBlock>
              <CodeBlockHeader>
                <CodeBlockTitle>{file.title}</CodeBlockTitle>
                <CodeBlockActions>
                  <CodeBlockCopyButton value={file.code} />
                </CodeBlockActions>
              </CodeBlockHeader>
              <FileCode code={file.code} language={file.language} />
            </CodeBlock>
          </TabsContent>
        )}
      </For>
    </Tabs>
  )
}
