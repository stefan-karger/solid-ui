// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For, createMemo } from "solid-js"

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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
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
              <path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
              <path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
              <path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />
              <path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
              <path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />
              <path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
              <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
              <path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />
            </svg>
          ) : (
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
              <path d="M20 6 9 17l-5-5" />
            </svg>
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
                <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
                <path d="M6.453 15h11.094" />
                <path d="M8.5 2h7" />
              </svg>
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
                                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                                <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                                <path d="M10 12.5 8 15l2 2.5" />
                                <path d="m14 12.5 2 2.5-2 2.5" />
                              </svg>
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
