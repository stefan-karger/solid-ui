import { For, createMemo } from "solid-js"

import {
  useDemoChat,
  type UIMessage,
  createChat,
  getMessageText
} from "~/registry/lib/ai-demo-chat"
import { Bubble, BubbleContent } from "~/registry/ui/bubble"
import { Button } from "~/registry/ui/button"
import { Marker, MarkerContent } from "~/registry/ui/marker"
import { Message, MessageContent } from "~/registry/ui/message"

type ChatMessage = UIMessage<
  unknown,
  {
    checkpoint: {
      label: string
    }
  }
>

type CheckpointPart = Extract<
  ChatMessage["parts"][number],
  { type: "data-checkpoint" }
>

const chat = createChat<ChatMessage>()
  .user("Rename the button component to action.")
  .assistant(({ writer }) => {
    writer.text("Renamed Button to Action in components/ui/button.tsx.")
    writer.data({
      type: "data-checkpoint",
      id: "rename",
      data: { label: "Button renamed" }
    })
  })
  .user("Update the docs to match.")
  .assistant(({ writer }) => {
    writer.text("Updated the Button page to say Action.")
  })

const transcript = chat.get()
const transport = chat.transport({ delayMs: 20 })

export default function CheckpointDemo() {
  const { messages, sendMessage, setMessages, status } = useDemoChat({
    messages: transcript,
    transport
  })
  const nextMessage = () => chat.next(messages())
  const busy = () => status() === "submitted" || status() === "streaming"

  function restore(messageId: string) {
    const index = messages().findIndex((message) => message.id === messageId)

    if (index === -1) {
      return
    }

    setMessages(messages().slice(0, index + 1))
  }

  return (
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      {
        <For each={messages()}>
          {(message) => {
            const content = createMemo(() => {
              const checkpoint = message.parts.find(
                (part): part is CheckpointPart =>
                  part.type === "data-checkpoint"
              )
              const index = messages().findIndex(
                (item) => item.id === message.id
              )
              const canRestore = index < messages().length - 1

              return (
                <>
                  {message.role === "user" ? (
                    <Message align="end">
                      <MessageContent>
                        <Bubble align="end" variant="muted">
                          <BubbleContent>
                            {getMessageText(message)}
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  ) : (
                    <Message>
                      <MessageContent>
                        <p>{getMessageText(message)}</p>
                      </MessageContent>
                    </Message>
                  )}
                  {checkpoint && (
                    <Marker variant="separator">
                      <MarkerContent class="inline-flex items-center gap-2">
                        {checkpoint.data.label}
                        {canRestore && (
                          <Button
                            size="xs"
                            variant="outline"
                            aria-label={`Restore to ${checkpoint.data.label}`}
                            onClick={() => restore(message.id)}
                          >
                            Restore
                          </Button>
                        )}
                      </MarkerContent>
                    </Marker>
                  )}
                </>
              )
            })
            return <>{content()}</>
          }}
        </For>
      }
      {!busy() && nextMessage() && (
        <Button
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          onClick={() => sendMessage(nextMessage())}
        >
          Continue
        </Button>
      )}
    </div>
  )
}
