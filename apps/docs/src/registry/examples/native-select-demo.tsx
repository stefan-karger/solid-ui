import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "~/registry/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="orange">Orange</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="potato">Potato</NativeSelectOption>
        <NativeSelectOption value="tomato">Tomato</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
