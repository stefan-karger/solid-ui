import { MessageScrollerExample } from "./message-scroller-example"

const messages = [
  {
    role: "participant",
    text: "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?",
    sender: "Grace"
  },
  {
    role: "assistant",
    text: "Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need.",
    sender: "Mary (Agent)"
  },
  {
    role: "participant",
    text: "ping @rocky",
    sender: "Grace"
  },
  {
    role: "event",
    text: "Rocky has joined the chat"
  },
  {
    role: "participant",
    text: "Amaze. Astrophage eats light, makes heat, goes to carbon dioxide. Rocky has fuel model. Grace is smart.",
    sender: "Rocky"
  }
] as const

export default function MessageScrollerGroupChat() {
  return (
    <MessageScrollerExample
      title="Group Chat"
      description="A group chat with several participants and an assistant. The Marker is marked as a turn."
      scenario="group-chat"
      messages={messages}
    />
  )
}
