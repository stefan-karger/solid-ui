import { For } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine
} from "~/registry/ui/code-block"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/registry/ui/sheet"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

const files = [
  {
    path: "app/login/page.tsx",
    added: false,
    additions: 2,
    deletions: 2,
    diff: `@@ -14,7 +14,7 @@ export default async function LoginPage({
   searchParams,
 }) {
   const { next } = await searchParams
-  const redirectTo =
-    next && next.startsWith("/") ? next : "/"
+  const redirectTo = safeRedirect(next)
+
   return <LoginForm redirectTo={redirectTo} />
 }`
  },
  {
    path: "lib/auth/redirect.ts",
    added: true,
    additions: 7,
    deletions: 0,
    diff: `@@ -0,0 +1,7 @@
+export function safeRedirect(next: string | undefined) {
+  if (!next || !next.startsWith("/") || next.startsWith("//")) {
+    return "/"
+  }
+
+  return next
+}`
  }
]

function DiffLines({ diff }: { diff: string }) {
  return diff.split("\n").map((line) => {
    if (line.startsWith("@@")) {
      return <CodeBlockLine class="text-muted-foreground">{line}</CodeBlockLine>
    }

    return (
      <CodeBlockLine
        variant={
          line.startsWith("+")
            ? "added"
            : line.startsWith("-")
              ? "removed"
              : "default"
        }
      >
        {line.slice(1)}
      </CodeBlockLine>
    )
  })
}

export default function TraceCommit() {
  return (
    <Trace class="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="GitCommitHorizontalIcon" />
            </TraceIcon>
            <TraceTitle>Committed a1b2c3: Fix the login redirect</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <For each={files}>
              {(file) => (
                <Sheet>
                  <SheetTrigger>
                    <TraceLine>
                      <TraceIcon>
                        {file.added ? (
                          <IconPlaceholder lucide="FilePlusIcon" />
                        ) : (
                          <IconPlaceholder lucide="FilePenIcon" />
                        )}
                      </TraceIcon>
                      <TraceTitle>
                        {file.added ? "Added" : "Edited"} {file.path}
                      </TraceTitle>
                      <TraceDescription class="font-mono">
                        +{file.additions} −{file.deletions}
                      </TraceDescription>
                      <TraceIcon>
                        <IconPlaceholder lucide="ChevronRightIcon" />
                      </TraceIcon>
                    </TraceLine>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle class="font-mono">{file.path}</SheetTitle>
                      <SheetDescription>
                        {file.additions} additions, {file.deletions} deletions
                      </SheetDescription>
                    </SheetHeader>
                    <CodeBlock class="mx-6 mb-6 w-auto">
                      <CodeBlockContent>
                        <DiffLines diff={file.diff} />
                      </CodeBlockContent>
                    </CodeBlock>
                  </SheetContent>
                </Sheet>
              )}
            </For>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
