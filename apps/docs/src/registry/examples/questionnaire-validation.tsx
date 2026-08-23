import { createSignal } from "solid-js"

import { toast } from "solid-sonner"
import * as v from "valibot"

import { Card, CardAction, CardContent, CardFooter, CardHeader } from "~/registry/ui/card"
import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireRoot,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"

const items = [
  { name: "detail", required: true },
  { name: "audience", required: true }
] as const

const questionnaireSchema = v.pipe(
  v.object({
    detail: v.picklist(["summary", "complete"]),
    audience: v.picklist(["team", "public"])
  }),
  v.forward(
    v.partialCheck(
      [["detail"], ["audience"]],
      (answers) => answers.audience !== "public" || answers.detail !== "summary",
      "Public answers need enough context. Choose a complete answer."
    ),
    ["detail"]
  )
)

type QuestionnaireItemName = keyof v.InferOutput<typeof questionnaireSchema>
type QuestionnaireErrors = Partial<Record<QuestionnaireItemName, string>>

function ValidationProgress() {
  return (
    <QuestionnaireProgress class="min-w-0">
      {(state) => (
        <>
          {state.current} / {state.total}
        </>
      )}
    </QuestionnaireProgress>
  )
}

export default function QuestionnaireValidation() {
  const [item, setItem] = createSignal("detail")
  const [errors, setErrors] = createSignal<QuestionnaireErrors>({})

  function clearError(name: QuestionnaireItemName) {
    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })
  }

  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const result = v.safeParse(questionnaireSchema, {
      detail: formData.get("detail"),
      audience: formData.get("audience")
    })

    if (result.success) {
      setErrors({})
      toast("Agent response configured", {
        description: `Detail: ${result.output.detail} · Audience: ${result.output.audience}`
      })
      return
    }

    const nextErrors: QuestionnaireErrors = {}

    for (const issue of result.issues) {
      const name = issue.path?.[0]?.key

      if ((name === "detail" || name === "audience") && !nextErrors[name]) {
        nextErrors[name] = issue.message
      }
    }

    const firstInvalidItem = result.issues[0]?.path?.[0]?.key

    setErrors(nextErrors)

    if (firstInvalidItem === "detail" || firstInvalidItem === "audience") {
      setItem(firstInvalidItem)
    }
  }

  return (
    <QuestionnaireRoot
      class="mx-auto max-w-md"
      item={item()}
      items={items}
      onItemChange={setItem}
      onSubmit={handleSubmit}
    >
      <Card class="w-full">
        <QuestionnaireItem invalid={Boolean(errors().detail)} name="detail" required>
          <CardHeader>
            <QuestionnaireTitle>How much detail should the answer include?</QuestionnaireTitle>
            <QuestionnaireDescription>Choose the response depth.</QuestionnaireDescription>
            <CardAction>
              <ValidationProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice onChange={() => clearError("detail")} value="summary">
                Concise summary
              </QuestionnaireChoice>
              <QuestionnaireChoice onChange={() => clearError("detail")} value="complete">
                Complete answer
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError>{errors().detail}</QuestionnaireError>
          </CardContent>
        </QuestionnaireItem>

        <QuestionnaireItem invalid={Boolean(errors().audience)} name="audience" required>
          <CardHeader>
            <QuestionnaireTitle>Who will read the answer?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Public answers require complete context.
            </QuestionnaireDescription>
            <CardAction>
              <ValidationProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice onChange={() => clearError("audience")} value="team">
                My team
              </QuestionnaireChoice>
              <QuestionnaireChoice onChange={() => clearError("audience")} value="public">
                Public audience
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError>{errors().audience}</QuestionnaireError>
          </CardContent>
        </QuestionnaireItem>

        <CardFooter>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Validate answers</QuestionnaireSubmit>
          </QuestionnaireActions>
        </CardFooter>
      </Card>
    </QuestionnaireRoot>
  )
}
