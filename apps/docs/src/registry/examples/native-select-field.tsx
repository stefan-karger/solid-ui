import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select"

export default function NativeSelectField() {
  return (
    <Field>
      <FieldLabel for="native-select-country">Country</FieldLabel>
      <NativeSelect id="native-select-country">
        <NativeSelectOption value="">Select a country</NativeSelectOption>
        <NativeSelectOption value="us">United States</NativeSelectOption>
        <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
        <NativeSelectOption value="ca">Canada</NativeSelectOption>
        <NativeSelectOption value="au">Australia</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>Select your country of residence.</FieldDescription>
    </Field>
  )
}
