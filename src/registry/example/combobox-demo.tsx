import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemLabel,
  ComboboxSection,
  ComboboxTrigger,
} from "~/registry/ui/combobox";

interface Food {
  value: string;
  label: string;
  disabled: boolean;
}
interface Category {
  label: string;
  options: Food[];
}
const ALL_OPTIONS: Category[] = [
  {
    label: "Fruits",
    options: [
      { disabled: false, label: "Apple", value: "apple" },
      { disabled: false, label: "Banana", value: "banana" },
      { disabled: false, label: "Blueberry", value: "blueberry" },
      { disabled: true, label: "Grapes", value: "grapes" },
      { disabled: false, label: "Pineapple", value: "pineapple" },
    ],
  },
  {
    label: "Meat",
    options: [
      { disabled: false, label: "Beef", value: "beef" },
      { disabled: false, label: "Chicken", value: "chicken" },
      { disabled: false, label: "Lamb", value: "lamb" },
      { disabled: false, label: "Pork", value: "pork" },
    ],
  },
];

export default function ComboboxDemo() {
  return (
    <Combobox<Food, Category>
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <ComboboxItemLabel>{props.item.rawValue.label}</ComboboxItemLabel>
          <ComboboxItemIndicator />
        </ComboboxItem>
      )}
      optionDisabled="disabled"
      optionGroupChildren="options"
      optionLabel="label"
      options={ALL_OPTIONS}
      optionTextValue="label"
      optionValue="value"
      placeholder="Search a food…"
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
  );
}
