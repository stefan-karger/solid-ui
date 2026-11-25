import { MessageScrollerExample } from "./message-scroller-example"

const messages = [
  {
    role: "user",
    text: "We're seeing activation dip after workspace creation. Can you help me find the likely step?"
  },
  {
    role: "assistant",
    text: "The sharpest drop is between creating the workspace and inviting the first teammate.\n\nWorkspace creation is still healthy, but the invite step is where users pause. That suggests the product is asking for collaboration before the user has enough confidence in the workspace."
  },
  {
    role: "user",
    text: "What should I compare before we change the onboarding flow?"
  },
  {
    role: "assistant",
    text: "Compare three cohorts:\n\n1. Users who choose a template before inviting teammates.\n2. Users who start from a blank workspace.\n3. Users who skip invites and return within 24 hours.\n\nIf template users invite faster, the fix is probably better first-run guidance rather than a louder invite prompt."
  },
  {
    role: "user",
    text: "Can you turn that into an experiment?"
  },
  {
    role: "assistant",
    text: "Yes. Create a variant that shows a short checklist after workspace creation:\n\n- Pick a template.\n- Add one project detail.\n- Invite a teammate when the workspace has context.\n\nMeasure first invite completion, 24-hour return rate, and whether teams create a second project."
  },
  {
    role: "user",
    text: "What's the risk if we delay the invite prompt?"
  },
  {
    role: "assistant",
    text: "The main risk is reducing team creation for accounts that already know who they want to invite.\n\nTo protect that path, keep the invite action visible in the header and only change the primary empty-state guidance. That gives confident teams a direct route without forcing uncertain users through the invite step too early."
  }
] as const

export default function MessageScrollerCommands() {
  return (
    <MessageScrollerExample
      title="Commands"
      description="Drive the transcript from outside."
      scenario="commands"
      messages={messages}
    />
  )
}
