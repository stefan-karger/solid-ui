import { Checkbox } from "~/registry/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from "~/registry/ui/field"

export default function FieldCheckbox() {
  return (
    <div class="w-full max-w-xs">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
          <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
          <FieldGroup class="gap-3">
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-hard-disks" />
              <FieldLabel class="font-normal" for="finder-pref-hard-disks">
                Hard disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-external-disks" />
              <FieldLabel class="font-normal" for="finder-pref-external-disks">
                External disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-cds-dvds" />
              <FieldLabel class="font-normal" for="finder-pref-cds-dvds">
                CDs, DVDs, and iPods
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-servers" />
              <FieldLabel class="font-normal" for="finder-pref-servers">
                Connected servers
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Checkbox defaultChecked id="finder-pref-sync-folders" />
          <FieldContent>
            <FieldLabel for="finder-pref-sync-folders">Sync Desktop & Documents folders</FieldLabel>
            <FieldDescription>
              Your Desktop & Documents folders are synced with iCloud Drive, so you can access them
              from other devices.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  )
}
