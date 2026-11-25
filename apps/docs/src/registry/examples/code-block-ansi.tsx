// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
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

const output = `$ pnpm test
\x1b[32m✓\x1b[39m src/format.test.ts \x1b[2m(4 tests)\x1b[22m
\x1b[32m✓\x1b[39m src/parse.test.ts \x1b[2m(7 tests)\x1b[22m
\x1b[31m✗\x1b[39m src/stream.test.ts \x1b[2m(3 tests | 1 failed)\x1b[22m

\x1b[31mAssertionError: expected 'hello' to be 'hello world'\x1b[39m

Tests  \x1b[31m1 failed\x1b[39m | \x1b[32m13 passed\x1b[39m (14)`

export default function CodeBlockAnsi() {
  const lines = useHighlightedCode(
    () => output,
    () => "ansi"
  )

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
            <CodeBlockCopyButton
              value={output.replaceAll(
                new RegExp(String.fromCharCode(27) + "\\[[\\d;]*m", "g"),
                ""
              )}
            />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent wrap>
          <For each={lines()}>
            {(line) => <CodeBlockLine>{line}</CodeBlockLine>}
          </For>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
