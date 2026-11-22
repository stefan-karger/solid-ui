import { Show } from "solid-js"

import { Card, CardContent, CardHeader, CardTitle } from "~/registry/ui/card"
import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireError,
  QuestionnaireActions,
  QuestionnaireSubmit,
  QuestionnaireDescription,
  QuestionnairePrevious,
  QuestionnaireNext,
  QuestionnaireProgress,
  useQuestionnaire
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/toast"
function Actions() {
  const state = useQuestionnaire()
  const last = () => state.step() === state.steps().length - 1
  return (
    <QuestionnaireActions>
      <QuestionnairePrevious />
      <Show
        when={last()}
        fallback={<QuestionnaireNext>Next</QuestionnaireNext>}
      >
        <QuestionnaireSubmit>Task created</QuestionnaireSubmit>
      </Show>
    </QuestionnaireActions>
  )
}

export default function QuestionnaireCard() {
  const toast = createToaster()

  return (
    <div class="w-full max-w-md text-start">
      <Toaster toaster={toast} />
      <Card class="max-w-md">
        <CardHeader>
          <CardTitle>Create task</CardTitle>
        </CardHeader>
        <CardContent>
          <Questionnaire
            class="mx-auto max-w-md"
            steps={["task", "output"]}
            required={["task", "output"]}
            onComplete={() => toast("Task created")}
          >
            <QuestionnaireProgress />
            <QuestionnaireItem value="task">
              <QuestionnaireTitle>
                What should the agent work on?
              </QuestionnaireTitle>
              <QuestionnaireDescription>
                Choose the task that should be handled next.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="fix">
                  Fix the failing tests
                </QuestionnaireChoice>
                <QuestionnaireChoice value="refactor">
                  Refactor the data layer
                </QuestionnaireChoice>
                <QuestionnaireChoice value="docs">
                  Update the integration guide
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem value="output">
              <QuestionnaireTitle>
                What should the final handoff include?
              </QuestionnaireTitle>
              <QuestionnaireDescription>
                Pick the level of detail needed for review.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="summary">
                  Summary only
                </QuestionnaireChoice>
                <QuestionnaireChoice value="files">
                  Summary and changed files
                </QuestionnaireChoice>
                <QuestionnaireChoice value="review">
                  Full review handoff
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <Actions />
          </Questionnaire>
        </CardContent>
      </Card>
    </div>
  )
}
