import { Field, FieldLabel } from "~/registry/ui/field"
import { Progress } from "~/registry/ui/progress"

export default function ProgressWithLabel() {
  return (
    <Field class="w-full max-w-sm">
      <FieldLabel for="progress-upload">
        <span>Upload progress</span>
        <span class="ml-auto">66%</span>
      </FieldLabel>
      <Progress value={66} id="progress-upload" />
    </Field>
  )
}
