import { MessageScrollerExample } from "./message-scroller-example"

const messages = [
  {
    role: "user",
    text: "Can you show me how anchoring behaves when a new prompt starts the turn?"
  },
  {
    role: "assistant",
    text: "Append the user prompt first, then append the assistant response. With User selected, the prompt settles near the top and the assistant response fills in below it."
  },
  {
    role: "user",
    text: "What changes when assistant messages are the anchor?"
  },
  {
    role: "assistant",
    text: "Now each assistant response is the item `MessageScroller` keeps in view. This is useful when the reply is the moment you want readers to land on after each turn."
  },
  {
    role: "user",
    text: "Can I switch roles and keep adding turns?"
  },
  {
    role: "assistant",
    text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo."
  }
] as const

export default function MessageScrollerAnchoring() {
  return (
    <MessageScrollerExample
      title="Anchoring Turns"
      description="Choose which role settles near the top edge."
      scenario="anchoring"
      messages={messages}
    />
  )
}
