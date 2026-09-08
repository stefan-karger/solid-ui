import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select"

export default function NativeSelectDisabled() {
  return (
    <NativeSelect class="w-full max-w-52" disabled>
      <NativeSelectOption value="">Select priority</NativeSelectOption>
      <NativeSelectOption value="low">Low</NativeSelectOption>
      <NativeSelectOption value="medium">Medium</NativeSelectOption>
      <NativeSelectOption value="high">High</NativeSelectOption>
      <NativeSelectOption value="critical">Critical</NativeSelectOption>
    </NativeSelect>
  )
}
