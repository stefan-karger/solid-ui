import { For, createMemo } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { CodeBlock, CodeBlockContent } from "~/registry/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

type Test = {
  name: string
  status: "passed" | "failed" | "skipped"
  error?: string
}

const suites: { name: string; tests: Test[] }[] = [
  {
    name: "auth.test.ts",
    tests: [
      { name: "logs in with valid credentials", status: "passed" },
      { name: "rejects an invalid password", status: "passed" },
      { name: "refreshes an expired token", status: "passed" }
    ]
  },
  {
    name: "user-api.test.ts",
    tests: [
      { name: "creates a user", status: "passed" },
      {
        name: "updates a user profile",
        status: "failed",
        error: `Expected status 200, received 500

  at Object.<anonymous> (src/user-api.test.ts:45:12)`
      },
      { name: "deletes a user", status: "skipped" }
    ]
  },
  {
    name: "db.test.ts",
    tests: [
      { name: "connects to the database", status: "passed" },
      {
        name: "times out a slow query",
        status: "failed",
        error: `Exceeded timeout of 5000 ms for a test.

  at Object.<anonymous> (src/db.test.ts:22:3)`
      }
    ]
  }
]

function countTests(tests: Test[]) {
  return {
    total: tests.length,
    failed: tests.filter((test) => test.status === "failed").length,
    skipped: tests.filter((test) => test.status === "skipped").length
  }
}

function formatCounts({
  total,
  failed,
  skipped
}: ReturnType<typeof countTests>) {
  return [
    `${total} tests`,
    failed > 0 && `${failed} failed`,
    skipped > 0 && `${skipped} skipped`
  ]
    .filter(Boolean)
    .join(", ")
}

function TestRow(componentProps: { test: Test }) {
  const content = createMemo(() => {
    const { test } = componentProps
    if (test.status === "failed") {
      return (
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <IconPlaceholder lucide="XIcon" />
              </TraceIcon>
              <TraceTitle>{test.name}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap class="max-h-64">
                {test.error}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )
    }
    return (
      <TraceLine>
        <TraceIcon>
          {test.status === "skipped" ? (
            <IconPlaceholder lucide="CircleDashedIcon" />
          ) : (
            <IconPlaceholder lucide="CheckIcon" />
          )}
        </TraceIcon>
        <TraceTitle>
          {test.status === "skipped" ? `Skipped ${test.name}` : test.name}
        </TraceTitle>
      </TraceLine>
    )
  })
  return <>{content()}</>
}

export default function TestResultsSuites() {
  const summary = countTests(suites.flatMap((suite) => suite.tests))

  return (
    <Trace class="max-w-sm">
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status={summary.failed > 0 ? "error" : undefined}>
            <TraceIcon>
              <IconPlaceholder lucide="FlaskConicalIcon" />
            </TraceIcon>
            <TraceTitle>Ran {formatCounts(summary)}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {
              <For each={suites}>
                {(suite) => {
                  const content = createMemo(() => {
                    const counts = countTests(suite.tests)

                    return (
                      <TraceCollapsible defaultOpen={counts.failed > 0}>
                        <TraceCollapsibleTrigger>
                          <TraceLine
                            status={counts.failed > 0 ? "error" : undefined}
                          >
                            <TraceIcon>
                              <IconPlaceholder lucide="FileCodeIcon" />
                            </TraceIcon>
                            <TraceTitle>
                              {suite.name}, {formatCounts(counts)}
                            </TraceTitle>
                          </TraceLine>
                        </TraceCollapsibleTrigger>
                        <TraceCollapsibleContent>
                          <Trace>
                            {
                              <For each={suite.tests}>
                                {(test) => <TestRow test={test} />}
                              </For>
                            }
                          </Trace>
                        </TraceCollapsibleContent>
                      </TraceCollapsible>
                    )
                  })
                  return <>{content()}</>
                }}
              </For>
            }
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}
