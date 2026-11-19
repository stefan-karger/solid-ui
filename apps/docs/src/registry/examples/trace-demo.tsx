import {
  ArrowUpRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  GlobeIcon,
  LoaderCircleIcon,
  RotateCcwIcon
} from "lucide-solid"
import { createSignal, For, onCleanup, Show } from "solid-js"

import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { CodeBlock, CodeBlockContent } from "~/registry/ui/code-block"
import { Message, MessageContent } from "~/registry/ui/message"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle
} from "~/registry/ui/trace"

const commands = [
  { command: "pnpm --version", output: "10.18.0" },
  {
    command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
    output: " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)"
  },
  {
    command: "pnpm install --frozen-lockfile",
    output:
      'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json',
    failed: true
  }
]
const sources = [
  { title: "pnpm install | pnpm.io", url: "https://pnpm.io/cli/install#--frozen-lockfile" },
  { title: "Continuous Integration | pnpm.io", url: "https://pnpm.io/continuous-integration" }
]

export default function TraceDemo() {
  const complete = commands.length + 2
  const [stage, setStage] = createSignal(complete)
  const running = () => stage() < complete
  let timer: ReturnType<typeof setInterval> | undefined
  onCleanup(() => clearInterval(timer))

  function replay() {
    setStage(0)
    let step = 0
    timer = setInterval(() => {
      setStage(++step)
      if (step === complete) clearInterval(timer)
    }, 750)
  }

  return (
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-start text-sm">
      <Message align="end">
        <MessageContent>
          <Bubble align="end" variant="muted">
            <BubbleContent>Why does pnpm install fail in CI?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent class="gap-4">
          <Trace>
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine status={stage() === 0 ? "running" : undefined}>
                  <TraceIcon>
                    {stage() === 0 ? (
                      <LoaderCircleIcon class="animate-spin" />
                    ) : (
                      <CircleCheckIcon />
                    )}
                  </TraceIcon>
                  <TraceTitle>{stage() === 0 ? "Thinking" : "Thought for 5s"}</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                CI installs with a frozen lockfile, so the install stops when package.json and
                pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce
                the install.
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <For each={commands}>
              {(row, index) => (
                <Show when={stage() > index()}>
                  <Show
                    when={stage() > index() + 1}
                    fallback={
                      <TraceLine status="running">
                        <TraceIcon>
                          <LoaderCircleIcon class="animate-spin" />
                        </TraceIcon>
                        <TraceTitle>Running {row.command}</TraceTitle>
                      </TraceLine>
                    }
                  >
                    <TraceCollapsible>
                      <TraceCollapsibleTrigger>
                        <TraceLine status={row.failed ? "error" : undefined}>
                          <TraceIcon>
                            {row.failed ? <CircleAlertIcon /> : <CircleCheckIcon />}
                          </TraceIcon>
                          <TraceTitle>
                            {row.failed ? "Failed to run" : "Ran"} {row.command}
                          </TraceTitle>
                        </TraceLine>
                      </TraceCollapsibleTrigger>
                      <TraceCollapsibleContent>
                        <CodeBlock size="sm" variant={row.failed ? "destructive" : "default"}>
                          <CodeBlockContent wrap>{row.output}</CodeBlockContent>
                        </CodeBlock>
                      </TraceCollapsibleContent>
                    </TraceCollapsible>
                  </Show>
                </Show>
              )}
            </For>
            <Show when={stage() > commands.length}>
              <TraceCollapsible>
                <TraceCollapsibleTrigger>
                  <TraceLine status={running() ? "running" : undefined}>
                    <TraceIcon>
                      <GlobeIcon />
                    </TraceIcon>
                    <TraceTitle>{running() ? "Using" : "Used"} 2 sources</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent>
                  <Trace>
                    <For each={sources}>
                      {(source) => (
                        <a href={source.url} target="_blank" rel="noreferrer">
                          <TraceLine>
                            <TraceIcon>
                              <GlobeIcon />
                            </TraceIcon>
                            <TraceTitle>
                              {source.title}
                              <span class="sr-only"> (opens in a new tab)</span>
                            </TraceTitle>
                            <TraceIcon>
                              <ArrowUpRightIcon />
                            </TraceIcon>
                          </TraceLine>
                        </a>
                      )}
                    </For>
                  </Trace>
                </TraceCollapsibleContent>
              </TraceCollapsible>
            </Show>
          </Trace>
          <Show when={!running()}>
            <p>
              The last commit bumped a version in package.json without updating pnpm-lock.yaml, so
              the frozen install fails. Run pnpm install locally and commit the lockfile.
            </p>
          </Show>
        </MessageContent>
      </Message>
      <Button variant="outline" size="sm" class="self-start" disabled={running()} onClick={replay}>
        <RotateCcwIcon /> Replay
      </Button>
    </div>
  )
}
