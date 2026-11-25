import { MessageScrollerExample } from "./message-scroller-example"

const messages = [
  {
    role: "user",
    text: "Can user messages pop in like iMessage without breaking anchoring?"
  },
  {
    role: "assistant",
    text: "Yes. Animate the user row with transform and opacity, and let the assistant response stream normally below it.\n\nThat keeps the row measurement predictable while still giving the newly sent bubble a more tactile entrance."
  },
  {
    role: "user",
    text: "What makes the animation feel more like iMessage?"
  },
  {
    role: "assistant",
    text: "Use a quick spring from the trailing edge: a little scale, a small upward move, and no layout animation.\n\nThe bubble feels tactile, but the measured row stays predictable, so anchoring and auto-scroll do not have to fight a changing layout."
  },
  {
    role: "user",
    text: "Can I switch between presets while testing the same thread?"
  },
  {
    role: "assistant",
    text: "Yes. Keep the conversation in place while you change the preset, then send the next message to compare the new entrance against the same context.\n\nThat makes it easier to judge the difference between a subtle fade, a snappy pop, and a more dramatic 3D tilt without rebuilding the scenario each time."
  }
] as const

export default function MessageScrollerAnimation() {
  return (
    <MessageScrollerExample
      title="Animation"
      description="Choose how user messages are animated when they are added to the conversation."
      scenario="animation"
      messages={messages}
    />
  )
}
