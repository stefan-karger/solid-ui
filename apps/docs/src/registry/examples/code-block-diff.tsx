import { For } from "solid-js"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
} from "~/registry/ui/code-block"

const patch = ` export function Greeting({ name }: { name: string }) {
-  return <p>Hello, {name}</p>
+  return <p class="text-sm text-muted-foreground">
+    Hello, {name}!
+  </p>
 }`

function getVariant(line: string) {
  if (line.startsWith("+")) {
    return "added"
  }

  if (line.startsWith("-")) {
    return "removed"
  }

  return "default"
}

export default function CodeBlockDiff() {
  return (
    <div class="w-full max-w-md">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>components/greeting.tsx</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={patch} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>
          <For each={patch.split("\n")}>
            {(line) => (
              <CodeBlockLine variant={getVariant(line)}>
                {line.slice(1)}
              </CodeBlockLine>
            )}
          </For>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
