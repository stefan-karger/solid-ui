// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For, createSignal } from "solid-js"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea
} from "~/registry/ui/input-group"

const providers = [
  {
    name: "OpenAI",
    models: [
      { id: "gpt-5", name: "GPT-5" },
      { id: "gpt-5-mini", name: "GPT-5 mini" }
    ]
  },
  {
    name: "Anthropic",
    models: [
      { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
      { id: "claude-haiku-4-5", name: "Claude Haiku 4.5" }
    ]
  }
]

const models = providers.flatMap((provider) => provider.models)

const efforts = [
  { id: "low", name: "Low" },
  { id: "medium", name: "Medium" },
  { id: "high", name: "High" }
]

export default function ModelSelectorDemo() {
  const [text, setText] = createSignal("")
  const [model, setModel] = createSignal(models[0]!.id)
  const [effort, setEffort] = createSignal(efforts[1]!.id)
  let formRef: HTMLFormElement | undefined
  const currentModel = () =>
    models.find((item) => item.id === model()) ?? models[0]!
  const currentEffort = () =>
    efforts.find((item) => item.id === effort()) ?? efforts[1]!
  const canSend = () => text().trim().length > 0

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    if (!canSend()) {
      return
    }

    setText("")
  }

  return (
    <div class="mx-auto w-full max-w-lg py-6">
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
              type="submit"
              size="icon-sm"
              variant="outline"
              class="rounded-full"
              disabled={canSend()}
              aria-label="Attach"
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </InputGroupButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(triggerProps) => (
                  <InputGroupButton
                    {...triggerProps}
                    size="sm"
                    variant="outline"
                    aria-label={`Model: ${currentModel().name}`}
                    class="ml-auto"
                  >
                    {currentModel().name}
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </InputGroupButton>
                )}
              />
              <DropdownMenuContent align="start" class="w-48">
                <DropdownMenuRadioGroup
                  value={model()}
                  onValueChange={setModel}
                >
                  {
                    <For each={providers}>
                      {(provider, index) => (
                        <>
                          {index() > 0 && <DropdownMenuSeparator />}
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>
                              {provider.name}
                            </DropdownMenuLabel>
                            {
                              <For each={provider.models}>
                                {(item) => (
                                  <DropdownMenuRadioItem value={item.id}>
                                    {item.name}
                                  </DropdownMenuRadioItem>
                                )}
                              </For>
                            }
                          </DropdownMenuGroup>
                        </>
                      )}
                    </For>
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(triggerProps) => (
                  <InputGroupButton
                    {...triggerProps}
                    size="sm"
                    variant="outline"
                    aria-label={`Effort: ${currentEffort().name}`}
                  >
                    <span class="text-muted-foreground">Effort</span>
                    {currentEffort().name}
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </InputGroupButton>
                )}
              />
              <DropdownMenuContent align="start" class="w-36">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Effort</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={effort()}
                    onValueChange={setEffort}
                  >
                    {
                      <For each={efforts}>
                        {(item) => (
                          <DropdownMenuRadioItem value={item.id}>
                            {item.name}
                          </DropdownMenuRadioItem>
                        )}
                      </For>
                    }
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <InputGroupButton
              type="submit"
              size="icon-sm"
              variant="default"
              class="rounded-full"
              disabled={!canSend()}
              aria-label="Send"
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
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}
