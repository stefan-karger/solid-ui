import { MessageScrollerExample } from "./message-scroller-example"

const messages = [
  {
    role: "user",
    text: "Can you summarize the incident channel?"
  },
  {
    role: "assistant",
    text: "The first alert was a delayed export job. It started backing up around 09:42 UTC and triggered the warning once the retry queue crossed the threshold.\n\nNo customer-facing checkout paths were affected, but exports for larger workspaces were running about 12 minutes behind."
  },
  {
    role: "user",
    text: "Was checkout affected?"
  },
  {
    role: "assistant",
    text: "No checkout errors were reported. Payment authorization, order creation, and confirmation emails stayed inside their normal latency bands.\n\nThe only elevated metric was export queue depth, which maps to analytics downloads instead of checkout."
  },
  {
    role: "user",
    text: "What changed in the last deploy?"
  },
  {
    role: "assistant",
    text: "Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy, which made each failed attempt hold a worker slot longer than before.\n\nThe app deploy did not include checkout, pricing, or billing API changes."
  },
  {
    role: "user",
    text: "Do we need to roll back?"
  },
  {
    role: "assistant",
    text: "Not yet. Queue depth is recovering after we reduced retry concurrency, and the oldest pending job is now under five minutes old.\n\nKeep rollback ready if the queue starts climbing again, but the current trend points toward recovery."
  },
  {
    role: "user",
    text: "Keep watching for customer-visible issues."
  },
  {
    role: "assistant",
    text: "I will watch the queue and support tags for another 15 minutes. I am tracking export failures, delayed download requests, and any support thread that mentions missing reports.\n\nIf those stay quiet through the next batch window, we can close this as an internal degradation."
  }
] as const

export default function MessageScrollerLoadHistory() {
  return (
    <MessageScrollerExample
      title="Load History"
      description="Prepended messages keep your place."
      scenario="load-history"
      messages={messages}
    />
  )
}
