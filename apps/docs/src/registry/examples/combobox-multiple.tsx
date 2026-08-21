import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem
} from "~/registry/ui/combobox"

const frameworks = ["SolidJS", "SolidStart", "Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]
const countries = [
  { code: "af", value: "afghanistan", label: "Afghanistan", continent: "Asia" },
  { code: "al", value: "albania", label: "Albania", continent: "Europe" },
  { code: "dz", value: "algeria", label: "Algeria", continent: "Africa" },
  { code: "ad", value: "andorra", label: "Andorra", continent: "Europe" },
  { code: "ao", value: "angola", label: "Angola", continent: "Africa" },
  { code: "ar", value: "argentina", label: "Argentina", continent: "South America" },
  { code: "am", value: "armenia", label: "Armenia", continent: "Asia" },
  { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
  { code: "at", value: "austria", label: "Austria", continent: "Europe" },
  { code: "az", value: "azerbaijan", label: "Azerbaijan", continent: "Asia" },
  { code: "bs", value: "bahamas", label: "Bahamas", continent: "North America" },
  { code: "bh", value: "bahrain", label: "Bahrain", continent: "Asia" },
  { code: "bd", value: "bangladesh", label: "Bangladesh", continent: "Asia" },
  { code: "bb", value: "barbados", label: "Barbados", continent: "North America" },
  { code: "by", value: "belarus", label: "Belarus", continent: "Europe" },
  { code: "be", value: "belgium", label: "Belgium", continent: "Europe" },
  { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
  { code: "ca", value: "canada", label: "Canada", continent: "North America" },
  { code: "cn", value: "china", label: "China", continent: "Asia" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "de", value: "germany", label: "Germany", continent: "Europe" },
  { code: "in", value: "india", label: "India", continent: "Asia" },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
  { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
  { code: "gb", value: "united-kingdom", label: "United Kingdom", continent: "Europe" },
  { code: "us", value: "united-states", label: "United States", continent: "North America" }
]

export default function ComboboxMultiple() {
  return (
    <div class="grid max-w-sm gap-4">
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
      <Combobox<(typeof countries)[number]>
        itemComponent={(props) => (
          <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
        )}
        multiple
        optionLabel="label"
        options={countries}
        optionValue="value"
        placeholder="Search countries..."
      >
        <ComboboxInput<(typeof countries)[number]>
          getChipLabel={(v) => v.label}
          multiple
          placeholder="Search countries..."
        />
        <ComboboxContent>
          <ComboboxEmpty>No countries found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
