import { MessageScrollerExample } from "./message-scroller-example"

const messages = [
  {
    role: "user",
    text: "This is the first message the user sent in the conversation."
  },
  {
    role: "assistant",
    text: "Workspace creation rose 8%, but first invite completion only rose 2%."
  },
  {
    role: "user",
    text: "This is the last message the user sent in the conversation."
  },
  {
    role: "assistant",
    text: "Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen.\n4. Segment activation by template, since template users may not need invites right away.\n\nIf that pattern holds, the next experiment should make collaboration useful earlier instead of prompting for invites harder."
  }
] as const

export default function MessageScrollerOpeningPosition() {
  return (
    <MessageScrollerExample
      title="Opening Position"
      description="Choose where a saved transcript opens."
      scenario="opening-position"
      messages={messages}
    />
  )
}
