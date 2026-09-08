import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select"

export default function NativeSelectInvalid() {
  return (
    <NativeSelect aria-invalid="true" class="w-full max-w-52">
      <NativeSelectOption value="">Select role</NativeSelectOption>
      <NativeSelectOption value="admin">Admin</NativeSelectOption>
      <NativeSelectOption value="editor">Editor</NativeSelectOption>
      <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
      <NativeSelectOption value="guest">Guest</NativeSelectOption>
    </NativeSelect>
  )
}
