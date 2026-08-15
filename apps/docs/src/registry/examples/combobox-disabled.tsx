import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem } from "~/registry/ui/combobox"

const frameworks = ["SolidJS", "SolidStart", "Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxDisabled() {
  return (
    <Combobox
      options={frameworks}
      placeholder="Select a framework..."
      disabled
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
      )}
    >
      <ComboboxInput placeholder="Select a framework..." disabled />
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}