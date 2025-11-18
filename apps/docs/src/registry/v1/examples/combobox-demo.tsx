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
} from "~/registry/v1/ui/combobox"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js"
  },
  {
    value: "sveltekit",
    label: "SvelteKit"
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js"
  },
  {
    value: "remix",
    label: "Remix"
  },
  {
    value: "astro",
    label: "Astro"
  }
]

export default function ComboboxDemo() {
  return (
    <Combobox
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <ComboboxItemLabel>{props.item.rawValue.label}</ComboboxItemLabel>
          <ComboboxItemIndicator />
        </ComboboxItem>
      )}
      optionLabel="label"
      options={frameworks}
      optionTextValue="label"
      optionValue="value"
      placeholder="Search framework..."
      sectionComponent={(props) => (
        <ComboboxSection>{props.section.rawValue.label}</ComboboxSection>
      )}
    >
      <ComboboxControl aria-label="Framework">
        <ComboboxInput />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxContent />
    </Combobox>
  )
}
