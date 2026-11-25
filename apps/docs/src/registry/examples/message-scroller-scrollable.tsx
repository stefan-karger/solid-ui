import { MessageScrollerExample } from "./message-scroller-example"

const messages = [
  {
    role: "user",
    text: "Message 1. Scroll through the conversation to see how the status changes."
  },
  {
    role: "assistant",
    text: "Message 2. Scroll through the conversation to see how the status changes."
  },
  {
    role: "user",
    text: "Message 3. Scroll through the conversation to see how the status changes."
  },
  {
    role: "assistant",
    text: "Message 4. Scroll through the conversation to see how the status changes."
  },
  {
    role: "user",
    text: "Message 5. Scroll through the conversation to see how the status changes."
  },
  {
    role: "assistant",
    text: "Message 6. Scroll through the conversation to see how the status changes."
  },
  {
    role: "user",
    text: "Message 7. Scroll through the conversation to see how the status changes."
  },
  {
    role: "assistant",
    text: "Message 8. Scroll through the conversation to see how the status changes."
  },
  {
    role: "user",
    text: "Message 9. Scroll through the conversation to see how the status changes."
  },
  {
    role: "assistant",
    text: "Message 10. Scroll through the conversation to see how the status changes."
  },
  {
    role: "user",
    text: "Message 11. Scroll through the conversation to see how the status changes."
  },
  {
    role: "assistant",
    text: "Message 12. Scroll through the conversation to see how the status changes."
  }
] as const

export default function MessageScrollerScrollable() {
  return (
    <MessageScrollerExample
      title="Scroll Status"
      description="Where the reader can go scroll to based on current scroll position."
      scenario="scrollable"
      messages={messages}
    />
  )
}
