import { For, Show } from "solid-js"

import { toast } from "solid-sonner"

import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireRoot,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { Toaster } from "~/registry/ui/toast"

const questionnaireItems = [
  {
    choices: [
      {
        description: "Show what the agent ran and what came back.",
        label: "Tool call timeline",
        value: "tool-calls"
      },
      {
        description: "Ask before sensitive or destructive actions.",
        label: "Approval checkpoints",
        value: "approvals"
      },
      {
        description: "Make delegated work and results easier to follow.",
        label: "Sub-agent handoffs",
        value: "handoffs"
      }
    ],
    description: "Choose a direction or describe another task.",
    input: {
      label: "Another agent feature",
      placeholder: "Describe another feature…"
    },
    name: "direction",
    required: true,
    title: "What should the agent build next?"
  },
  {
    choices: [
      { label: "Progress", value: "progress" },
      { label: "Decisions", value: "decisions" },
      { label: "Risks", value: "risks" },
      { label: "Next step", value: "next-step" }
    ],
    description: "Select all that apply, or skip this question.",
    multiple: true,
    name: "signals",
    required: false,
    title: "What should every progress update include?"
  },
  {
    choices: [
      { label: "Start now", value: "now" },
      { label: "Next development cycle", value: "next-cycle" },
      { label: "Add it to the backlog", value: "backlog" }
    ],
    description: "Choose when the agent should begin the work.",
    name: "timing",
    required: true,
    title: "When should work begin?"
  }
] as const

export default function QuestionnaireDemo() {
  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const answers = {
      direction: formData.get("direction"),
      signals: formData.getAll("signals"),
      timing: formData.get("timing")
    }

    toast("Agent plan saved", {
      description: `Direction: ${answers.direction ?? "None"} · Progress signals: ${answers.signals.join(", ") || "None"} · Timing: ${answers.timing ?? "None"}`
    })
  }

  return (
    <>
      <Toaster />
      <QuestionnaireRoot
        class="mx-auto max-w-md"
        defaultItem="direction"
        items={questionnaireItems}
        onSubmit={handleSubmit}
        shortcuts="letters"
      >
        <QuestionnaireProgress />
        <For each={questionnaireItems}>
          {(question) => (
            <QuestionnaireItem
              multiple={"multiple" in question && question.multiple}
              name={question.name}
              required={question.required}
            >
              <QuestionnaireTitle>{question.title}</QuestionnaireTitle>
              <QuestionnaireDescription>{question.description}</QuestionnaireDescription>
              <QuestionnaireChoices>
                <For each={question.choices}>
                  {(choice) => (
                    <QuestionnaireChoice value={choice.value}>
                      <span class="font-medium">{choice.label}</span>
                      <Show when={"description" in choice ? choice.description : undefined}>
                        {(description) => (
                          <span class="text-muted-foreground">{description()}</span>
                        )}
                      </Show>
                    </QuestionnaireChoice>
                  )}
                </For>
                <Show when={"input" in question ? question.input : undefined}>
                  {(input) => (
                    <QuestionnaireInput
                      aria-label={input().label}
                      placeholder={input().placeholder}
                    />
                  )}
                </Show>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
          )}
        </For>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
        </QuestionnaireActions>
      </QuestionnaireRoot>
    </>
  )
}
