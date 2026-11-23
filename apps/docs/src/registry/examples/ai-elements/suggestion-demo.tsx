import { ArrowUpIcon, PlusIcon } from "lucide-solid"
import { For, createSignal } from "solid-js"

import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea
} from "~/registry/ui/input-group"
import { Message, MessageContent } from "~/registry/ui/message"

const suggestions = [
  "Add a dark mode toggle",
  "Fix the failing build",
  "Write tests for the form",
  "Upgrade to Next.js 16",
  "Add a loading state",
  "Find unused dependencies"
]

const replies: Record<string, string> = {
  "Add a dark mode toggle":
    "Added a ModeToggle to the site header. It calls setTheme from next-themes.",
  "Fix the failing build":
    "The build failed on a missing import in app/page.tsx. I added it and the build passes.",
  "Write tests for the form":
    "Added four tests in signup-form.test.tsx. They cover the empty, invalid and valid states.",
  "Upgrade to Next.js 16":
    "Ran the codemod and bumped next to 16. Two routes needed async params, so I updated them.",
  "Add a loading state":
    "Added a loading.tsx to the dashboard route. It shows skeletons while the data loads.",
  "Find unused dependencies":
    "Three packages are not imported anywhere: lodash, moment and classnames. Should I remove them?"
}

export default function SuggestionDemo() {
  const [text, setText] = createSignal("")
  const [turn, setTurn] = createSignal<{
    prompt: string
    reply: string
  } | null>(null)
  let formRef: HTMLFormElement | undefined
  const canSend = () => text().trim().length > 0

  function send(prompt: string) {
    setTurn({
      prompt,
      reply:
        replies[prompt] ?? "This demo only knows the suggestions. Pick one."
    })
    setText("")
  }

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    if (!canSend()) {
      return
    }

    send(text().trim())
  }

  return (
    <div class="mx-auto flex w-full max-w-lg flex-col gap-6 py-6 text-sm">
      {turn() && (
        <div class="flex flex-col gap-4">
          <Message align="end">
            <MessageContent>
              <Bubble align="end" variant="muted">
                <BubbleContent>{turn()?.prompt}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              <p>{turn()?.reply}</p>
            </MessageContent>
          </Message>
        </div>
      )}
      <div class="flex flex-col gap-2">
        <div class="flex scrollbar-none gap-2 overflow-x-auto overscroll-x-contain scroll-fade-x">
          {
            <For each={suggestions}>
              {(suggestion) => (
                <Button
                  variant="outline"
                  size="sm"
                  class="shrink-0"
                  onClick={() => send(suggestion)}
                >
                  {suggestion}
                </Button>
              )}
            </For>
          }
        </div>
        <form
          ref={(element) => {
            formRef = element
          }}
          onSubmit={onSubmit}
        >
          <InputGroup>
            <InputGroupTextarea
              value={text()}
              onInput={(event) => setText(event.currentTarget.value)}
              placeholder="Ask the agent to change your code..."
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  formRef?.requestSubmit()
                }
              }}
              class="p-3"
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                size="icon-sm"
                variant="outline"
                class="rounded-full"
                aria-label="Attach files"
              >
                <PlusIcon />
              </InputGroupButton>
              <InputGroupButton
                type="submit"
                size="icon-sm"
                variant="default"
                class="ml-auto rounded-full"
                disabled={!canSend()}
                aria-label="Send"
              >
                <ArrowUpIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </div>
  )
}
