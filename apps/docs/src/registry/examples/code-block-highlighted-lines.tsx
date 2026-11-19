import { For } from "solid-js"

import { CodeBlock, CodeBlockContent, CodeBlockLine } from "~/registry/ui/code-block"

const code = `export default {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
}`

const highlighted = [2, 3]

export default function CodeBlockHighlightedLines() {
  return (
    <div class="w-full max-w-md">
      <CodeBlock>
        <CodeBlockContent lineNumbers>
          <For each={code.split("\n")}>
            {(line, index) => (
              <CodeBlockLine variant={highlighted.includes(index()) ? "highlighted" : "default"}>
                {line}
              </CodeBlockLine>
            )}
          </For>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
