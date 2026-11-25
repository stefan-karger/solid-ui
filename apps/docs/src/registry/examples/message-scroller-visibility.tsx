import { MessageScrollerExample } from "./message-scroller-example"

const messages = [
  {
    role: "user",
    text: "Review the incident handoff and tell me what to read first."
  },
  {
    role: "assistant",
    text: "Start with the summary and the impact section. The regression affected the upload queue, but the recovery path completed for every queued job."
  },
  {
    role: "user",
    text: "What was the customer impact?"
  },
  {
    role: "assistant",
    text: "Impact was limited to delayed processing.\n\nNo records were dropped, and the reconciliation worker confirmed each retry batch. Support saw confusion from two customers, but there were no checkout or billing errors."
  },
  {
    role: "user",
    text: "What actions are open?"
  },
  {
    role: "assistant",
    text: "Keep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike."
  },
  {
    role: "user",
    text: "Give me the follow-up checklist."
  },
  {
    role: "assistant",
    text: "After that, compare the queue recovery graph with the deploy timeline so the handoff shows exactly when processing returned to baseline. That makes it easier for support and engineering to answer the same customer questions without re-reading the whole incident thread.\n\nI would also add a short owner note beside each follow-up item. The checklist is small, but ownership keeps the retry-window decision, alert tuning, and support macro from drifting into separate follow-up conversations.\n\nKeep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike."
  }
] as const

export default function MessageScrollerVisibility() {
  return (
    <MessageScrollerExample
      title="Transcript Outline"
      description="Track the current anchored turn."
      scenario="visibility"
      messages={messages}
    />
  )
}
