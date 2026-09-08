import { Checkbox } from "~/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet
} from "~/registry/ui/field"

export default function FieldGroupExample() {
  return (
    <div class="w-full max-w-xs">
      <FieldGroup>
        <FieldSet>
          <FieldLabel>Responses</FieldLabel>
          <FieldDescription>
            Get notified when responses complete for longer requests, like research or image
            generation.
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox defaultChecked disabled id="field-group-push" />
              <FieldLabel class="font-normal" for="field-group-push">
                Push notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLabel>Tasks</FieldLabel>
          <FieldDescription>
            Get notified when tasks you created have updates. <a href="#">Manage tasks</a>
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id="field-group-push-tasks" />
              <FieldLabel class="font-normal" for="field-group-push-tasks">
                Push notifications
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="field-group-email-tasks" />
              <FieldLabel class="font-normal" for="field-group-email-tasks">
                Email notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
