import { toast } from "solid-sonner";
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
  QuestionnaireTitle,
} from "~/registry/ui/questionnaire";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "~/registry/ui/card";
import { Toaster } from "~/registry/ui/toast";

const items = [
  {
    choices: [{ value: "fix" }, { value: "refactor" }, { value: "docs" }],
    name: "task",
    required: true,
  },
  {
    choices: [{ value: "summary" }, { value: "files" }, { value: "review" }],
    name: "output",
    required: true,
  },
] as const;

export default function QuestionnaireCard() {
  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    toast("Agent task created", {
      description: `Task: ${formData.get("task") ?? "None"} · Handoff: ${formData.get("output") ?? "None"}`,
    });
  }

  return (
    <>
      <Toaster />
      <QuestionnaireRoot
        class="mx-auto max-w-md"
        defaultItem="task"
        items={items}
        shortcuts="numbers"
        onSubmit={handleSubmit}
      >
        <Card>
          <QuestionnaireItem name="task" required>
            <CardHeader>
              <QuestionnaireTitle class="z-card-title z-font-heading">
                What should the agent work on?
              </QuestionnaireTitle>
              <QuestionnaireDescription class="z-card-description">
                Choose the task that should be handled next.
              </QuestionnaireDescription>
              <CardAction>
                <QuestionnaireProgress />
              </CardAction>
            </CardHeader>
            <CardContent>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="fix">Fix the failing tests</QuestionnaireChoice>
                <QuestionnaireChoice value="refactor">
                  Refactor the data layer
                </QuestionnaireChoice>
                <QuestionnaireChoice value="docs">
                  Update the integration guide
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </CardContent>
          </QuestionnaireItem>

          <QuestionnaireItem name="output" required>
            <CardHeader>
              <QuestionnaireTitle class="z-card-title z-font-heading">
                What should the final handoff include?
              </QuestionnaireTitle>
              <QuestionnaireDescription class="z-card-description">
                Pick the level of detail needed for review.
              </QuestionnaireDescription>
              <CardAction>
                <QuestionnaireProgress />
              </CardAction>
            </CardHeader>
            <CardContent>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="summary">Summary only</QuestionnaireChoice>
                <QuestionnaireChoice value="files">Summary and changed files</QuestionnaireChoice>
                <QuestionnaireChoice value="review">Full review handoff</QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </CardContent>
          </QuestionnaireItem>

          <CardFooter>
            <QuestionnaireActions class="w-full">
              <QuestionnairePrevious />
              <QuestionnaireNext>Next</QuestionnaireNext>
              <QuestionnaireSubmit>Create task</QuestionnaireSubmit>
            </QuestionnaireActions>
          </CardFooter>
        </Card>
      </QuestionnaireRoot>
    </>
  );
}
