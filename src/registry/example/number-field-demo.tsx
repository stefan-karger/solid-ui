import { createSignal } from "solid-js";

import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldErrorMessage,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/registry/ui/number-field";

export default function NumberFieldDemo() {
  const [rawValue, setRawValue] = createSignal<number>();

  return (
    <NumberField
      class="flex w-36 flex-col gap-2"
      onRawValueChange={setRawValue}
      validationState={rawValue() !== 40 ? "invalid" : "valid"}
    >
      <NumberFieldGroup>
        <NumberFieldInput />
        <NumberFieldIncrementTrigger />
        <NumberFieldDecrementTrigger />
      </NumberFieldGroup>
      <NumberFieldErrorMessage>Hmm, I prefer 40.</NumberFieldErrorMessage>
    </NumberField>
  );
}
