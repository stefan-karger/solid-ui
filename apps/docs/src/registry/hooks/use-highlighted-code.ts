import { createMemo, type Accessor } from "solid-js"

import {
  highlightCodeTokens,
  renderHighlightedLines
} from "~/registry/lib/highlighter"

export function useHighlightedCode(
  code: Accessor<string>,
  language: Accessor<string>
) {
  const tokens = createMemo(() => highlightCodeTokens(code(), language()))
  return () => renderHighlightedLines(tokens())
}
