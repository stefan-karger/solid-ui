import { TextField, TextFieldInput, TextFieldLabel } from "@/registry/ui/text-field"

export default function TextFieldDemo() {
  return (
    <TextField class="grid w-full max-w-sm items-center gap-1.5">
      <TextFieldLabel for="email">Email</TextFieldLabel>
      <TextFieldInput type="email" id="email" placeholder="Email" />
    </TextField>
  )
}
