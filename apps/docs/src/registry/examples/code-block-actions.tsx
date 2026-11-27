import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle
} from "~/registry/ui/code-block"

const output = `$ pnpm lint
apps/web/components/message-list.tsx
  18:22  error  'messages' is possibly 'undefined'. Add a guard before calling map  @typescript-eslint/no-unsafe-call
  42:7   warning  React Hook React.useEffect has a missing dependency: 'scrollToBottom'  react-hooks/exhaustive-deps

✖ 2 problems (1 error, 1 warning)`

function download(value: string, filename: string) {
  const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function CodeBlockActionsExample() {
  const [wrap, setWrap] = createSignal(true)

  return (
    <div class="w-full max-w-md">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <IconPlaceholder lucide="TerminalIcon" />
            Terminal
          </CodeBlockTitle>
          <CodeBlockActions>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Wrap lines"
              aria-pressed={wrap() ? "true" : "false"}
              class="aria-pressed:text-foreground"
              onClick={() => setWrap((enabled) => !enabled)}
            >
              <IconPlaceholder lucide="TextWrapIcon" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Download"
              onClick={() => download(output, "lint.log")}
            >
              <IconPlaceholder lucide="DownloadIcon" />
            </Button>
            <CodeBlockCopyButton value={output} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent wrap={wrap()}>{output}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
