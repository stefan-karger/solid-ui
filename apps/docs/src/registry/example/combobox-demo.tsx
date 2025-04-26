import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemLabel,
  ComboboxSection,
  ComboboxTrigger
} from "@/registry/ui/combobox"

interface Food {
  value: string
  label: string
  disabled: boolean
}
interface Category {
  label: string
  options: Food[]
}
const ALL_OPTIONS: Category[] = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple", disabled: false },
      { value: "banana", label: "Banana", disabled: false },
      { value: "blueberry", label: "Blueberry", disabled: false },
      { value: "grapes", label: "Grapes", disabled: true },
      { value: "pineapple", label: "Pineapple", disabled: false }
    ]
  },
  {
    label: "Meat",
    options: [
      { value: "beef", label: "Beef", disabled: false },
      { value: "chicken", label: "Chicken", disabled: false },
      { value: "lamb", label: "Lamb", disabled: false },
      { value: "pork", label: "Pork", disabled: false }
    ]
  }
]

export default function ComboboxDemo() {
  return (
    <Combobox<Food, Category>
      options={ALL_OPTIONS}
      optionValue="value"
      optionTextValue="label"
      optionLabel="label"
      optionDisabled="disabled"
      optionGroupChildren="options"
      placeholder="Search a food…"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <ComboboxItemLabel>{props.item.rawValue.label}</ComboboxItemLabel>
          <ComboboxItemIndicator />
        </ComboboxItem>
      )}
      sectionComponent={(props) => (
        <ComboboxSection>{props.section.rawValue.label}</ComboboxSection>
      )}
    >
      <ComboboxControl aria-label="Food">
        <ComboboxInput />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxContent />
    </Combobox>
  )
}
