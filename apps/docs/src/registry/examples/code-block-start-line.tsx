import { For } from "solid-js"

import { useHighlightedCode } from "~/registry/hooks/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
} from "~/registry/ui/code-block"

const code = `  if (!session) {
    redirect("/login")
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return <ProjectList projects={projects} />
}`

export default function CodeBlockStartLine() {
  const lines = useHighlightedCode(
    () => code,
    () => "tsx"
  )

  return (
    <div class="w-full max-w-md">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>app/dashboard/page.tsx</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent lineNumbers startLine={995}>
          <For each={lines()}>
            {(line) => <CodeBlockLine>{line}</CodeBlockLine>}
          </For>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
