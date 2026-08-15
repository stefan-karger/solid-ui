import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "~/registry/ui/combobox"

const frameworks = ["SolidJS", "SolidStart", "Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxBasic() {
  return (
    <Combobox
      options={frameworks}
      placeholder="Select a framework..."
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
      )}
    >
      <ComboboxInput placeholder="Select a framework..." />
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
