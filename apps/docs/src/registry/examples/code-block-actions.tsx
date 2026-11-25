// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { createSignal } from "solid-js"

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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19h8" />
              <path d="m4 17 6-6-6-6" />
            </svg>
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m16 16-3 3 3 3" />
                <path d="M3 12h14.5a1 1 0 0 1 0 7H13" />
                <path d="M3 19h6" />
                <path d="M3 5h18" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Download"
              onClick={() => download(output, "lint.log")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
            </Button>
            <CodeBlockCopyButton value={output} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent wrap={wrap()}>{output}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
