import { micromark } from "micromark"
import { For } from "solid-js"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton
} from "~/registry/ui/code-block"

const fencedBlock = /(^```[^\r\n]*\r?\n[\s\S]*?^```[ \t]*(?:\r?\n|$))/m

export function Markdown(props: { children: string }) {
  return (
    <div class="space-y-3 wrap-break-word [&_li]:ml-5 [&_li]:list-disc">
      <For
        each={props.children
          .split(fencedBlock)
          .map((block, index) => ({ block, code: index % 2 === 1 }))}
      >
        {({ block, code }) => {
          if (!block.trim()) return null
          if (code) {
            const source = block
              .replace(/^```[^\r\n]*\r?\n/, "")
              .replace(/^\s*```[ \t]*\s*$/m, "")
              .trimEnd()
            return (
              <CodeBlock size="sm">
                <CodeBlockActions>
                  <CodeBlockCopyButton value={source} />
                </CodeBlockActions>
                <CodeBlockContent lineNumbers>{source}</CodeBlockContent>
              </CodeBlock>
            )
          }
          return (
            <div
              class="space-y-3 [&_code]:font-mono [&_pre]:overflow-auto"
              // eslint-disable-next-line solid/no-innerhtml -- micromark escapes HTML and filters unsafe URLs.
              innerHTML={micromark(block, {
                allowDangerousHtml: false,
                allowDangerousProtocol: false
              })}
            />
          )
        }}
      </For>
    </div>
  )
}
