import { For } from "solid-js"

import { useHighlightedCode } from "~/registry/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
} from "~/registry/ui/code-block"

const samples = [
  {
    language: "css",
    title: "app/globals.css",
    code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`
  },
  {
    language: "python",
    title: "main.py",
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`
  },
  {
    language: "text",
    title: "notes.txt",
    code: "A language that is not in the list renders as plain text."
  }
]

function Sample(props: { code: string; language: string }) {
  const lines = useHighlightedCode(
    () => props.code,
    () => props.language
  )

  return (
    <CodeBlockContent>
      <For each={lines()}>
        {(line) => <CodeBlockLine>{line}</CodeBlockLine>}
      </For>
    </CodeBlockContent>
  )
}

export default function CodeBlockLanguages() {
  return (
    <div class="flex w-full max-w-md flex-col gap-4">
      <For each={samples}>
        {(sample) => (
          <CodeBlock>
            <CodeBlockHeader>
              <CodeBlockTitle>{sample.title}</CodeBlockTitle>
            </CodeBlockHeader>
            <Sample code={sample.code} language={sample.language} />
          </CodeBlock>
        )}
      </For>
    </div>
  )
}
