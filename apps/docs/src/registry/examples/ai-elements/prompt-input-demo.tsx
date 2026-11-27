import { For, createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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
                        <IconPlaceholder lucide="FileTextIcon" />
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
                          <IconPlaceholder lucide="XIcon" />
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
              <IconPlaceholder lucide="PlusIcon" />
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
                    <IconPlaceholder lucide="ChevronDownIcon" />
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
                    <IconPlaceholder lucide="ChevronDownIcon" />
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
              <IconPlaceholder lucide="ArrowUpIcon" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}
