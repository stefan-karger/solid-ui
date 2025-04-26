import { createSignal } from "solid-js"

import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel
} from "@/registry/ui/text-field"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TextFieldErrorDemo() {
  const [value, setValue] = createSignal("no valid email")
  const [error, setError] = createSignal(true)

  const verifyInput = (value: string) => {
    const isValid = /^.+@.+\..+$/.test(value) && value.length < 256
    setError(!isValid)
    setValue(value)
  }

  return (
    <TextField
      validationState={error() ? "invalid" : "valid"}
      value={value()}
      onChange={verifyInput}
    >
      <TextFieldLabel>Email</TextFieldLabel>
      <Tooltip>
        <TooltipTrigger as={TextFieldInput} required />
        <TooltipContent>
          <TextFieldErrorMessage>Please enter a valid email.</TextFieldErrorMessage>
        </TooltipContent>
      </Tooltip>
    </TextField>
  )
}
