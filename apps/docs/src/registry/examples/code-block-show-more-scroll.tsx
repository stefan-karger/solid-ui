import { ChevronDownIcon } from "lucide-solid"
import { createSignal, createUniqueId, For } from "solid-js"

import { useHighlightedCode } from "~/registry/hooks/use-highlighted-code"
import { Button } from "~/registry/ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
} from "~/registry/ui/code-block"

const code = `"use client"

import { useChat } from "@ai-sdk/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Chat() {
  const [input, setInput] = React.useState("")
  const { messages, sendMessage, status } = useChat()

  return (
    <div class="flex flex-col gap-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, index) =>
            part.type === "text" ? <p key={index}>{part.text}</p> : null
          )}
        </div>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          sendMessage({ text: input })
          setInput("")
        }}
      >
        <Input value={input} onChange={(event) => setInput(event.target.value)} />
        <Button disabled={status !== "ready"}>Send</Button>
      </form>
    </div>
  )
}`

export default function CodeBlockShowMoreScroll() {
  const [expanded, setExpanded] = createSignal(false)
  const lines = useHighlightedCode(
    () => code,
    () => "tsx"
  )
  const id = createUniqueId()

  return (
    <div class="w-full max-w-md">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>components/chat.tsx</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent
          id={id}
          lineNumbers
          class={
            expanded()
              ? "max-h-96 scroll-fade-y"
              : "max-h-64 overflow-y-hidden scroll-fade-y"
          }
        >
          <For each={lines()}>
            {(line) => <CodeBlockLine>{line}</CodeBlockLine>}
          </For>
        </CodeBlockContent>
        <CodeBlockFooter class="justify-center">
          <Button
            variant="ghost"
            size="xs"
            aria-expanded={expanded() ? "true" : "false"}
            aria-controls={id}
            onClick={() => setExpanded(!expanded())}
          >
            <ChevronDownIcon class="transition-transform in-aria-expanded:rotate-180" />
            {expanded() ? "Show less" : "Show more"}
          </Button>
        </CodeBlockFooter>
      </CodeBlock>
    </div>
  )
}
