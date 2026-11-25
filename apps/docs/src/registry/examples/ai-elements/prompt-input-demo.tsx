// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { For, createSignal } from "solid-js"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentMedia,
  AttachmentTitle
} from "~/registry/ui/attachment"
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

type AttachmentFile = {
  id: string
  name: string
}

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

export default function PromptInputDemo() {
  const [text, setText] = createSignal("")
  const [files, setFiles] = createSignal<AttachmentFile[]>([])
  const [model, setModel] = createSignal(models[0]!.id)
  const [effort, setEffort] = createSignal(efforts[1]!.id)
  let formRef: HTMLFormElement | undefined
  let inputRef: HTMLInputElement | undefined
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
    setFiles([])
  }

  function onAttach(event: Event & { currentTarget: HTMLInputElement }) {
    const selected = event.currentTarget.files
    if (!selected) {
      return
    }

    setFiles((current) => [
      ...current,
      ...Array.from(selected, (file) => ({
        id: crypto.randomUUID(),
        name: file.name
      }))
    ])
    event.currentTarget.value = ""
  }

  return (
    <div class="mx-auto w-full max-w-lg py-6">
      <form
        ref={(element) => {
          formRef = element
        }}
        onSubmit={onSubmit}
      >
        <input
          ref={(element) => {
            inputRef = element
          }}
          type="file"
          multiple
          class="sr-only"
          tabindex={-1}
          onChange={onAttach}
        />
        <InputGroup>
          {files().length > 0 && (
            <InputGroupAddon align="block-start" class="flex-wrap">
              {
                <For each={files()}>
                  {(file) => (
                    <Attachment size="sm">
                      <AttachmentMedia>
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
                          <path d="M10 9H8" />
                          <path d="M16 13H8" />
                          <path d="M16 17H8" />
                        </svg>
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>{file.name}</AttachmentTitle>
                      </AttachmentContent>
                      <AttachmentActions>
                        <AttachmentAction
                          aria-label={`Remove ${file.name}`}
                          onClick={() =>
                            setFiles((current) =>
                              current.filter((item) => item.id !== file.id)
                            )
                          }
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
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </AttachmentAction>
                      </AttachmentActions>
                    </Attachment>
                  )}
                </For>
              }
            </InputGroupAddon>
          )}
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
              onClick={() => inputRef?.click()}
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
