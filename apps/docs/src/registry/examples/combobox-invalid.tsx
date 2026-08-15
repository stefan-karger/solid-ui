import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem } from "~/registry/ui/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "~/registry/ui/field"

const frameworks = ["SolidJS", "SolidStart", "Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxInvalid() {
  return (
    <div class="flex flex-col gap-4">
      <Combobox
        options={frameworks}
        placeholder="Select a framework..."
        validationState="invalid"
        itemComponent={(props) => (
          <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
        )}
      >
        <ComboboxInput placeholder="Select a framework..." aria-invalid="true" />
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
      <Field data-invalid>
        <FieldLabel for="combobox-framework-invalid">Framework</FieldLabel>
        <Combobox
          options={frameworks}
          placeholder="Select a framework..."
          validationState="invalid"
          itemComponent={(props) => (
            <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
          )}
        >
          <ComboboxInput
            id="combobox-framework-invalid"
            placeholder="Select a framework..."
            aria-invalid="true"
          />
          <ComboboxContent>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
        <FieldDescription>Please select a valid framework.</FieldDescription>
        <FieldError errors={[{ message: "This field is required." }]} />
      </Field>
    </div>
  )
}