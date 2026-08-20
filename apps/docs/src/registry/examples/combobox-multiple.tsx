import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem
} from "~/registry/ui/combobox"

const frameworks = ["SolidJS", "SolidStart", "Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxMultiple() {
  return (
    <Combobox
      class="max-w-[300px]"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
      )}
      multiple
      options={frameworks}
      placeholder="Select a framework..."
    >
      <ComboboxInput multiple placeholder="Select a framework..." />
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
