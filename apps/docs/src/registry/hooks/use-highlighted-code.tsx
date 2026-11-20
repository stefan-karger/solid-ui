import { createMemo, For, type Accessor } from "solid-js"

import { highlightCodeTokens } from "~/registry/lib/code-highlighter"

export function useHighlightedCode(
  code: Accessor<string>,
  language: Accessor<string>
) {
  const tokens = createMemo(() => highlightCodeTokens(code(), language()))
  return () =>
    tokens().map((line) =>
      line.length === 0 ? (
        ""
      ) : (
        <For each={line}>
          {(token) => (
            <span
              class="text-(--token-light) dark:text-(--token-dark)"
              style={token.htmlStyle}
            >
              {token.content}
            </span>
          )}
        </For>
      )
    )
}
