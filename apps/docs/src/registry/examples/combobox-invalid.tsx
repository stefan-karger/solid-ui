import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem
} from "~/registry/ui/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "~/registry/ui/field"

const frameworks = ["SolidJS", "SolidStart", "Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export default function ComboboxInvalid() {
  return (
    <div class="flex flex-col gap-4">
      <Combobox
        itemComponent={(props) => (
          <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
        )}
        options={frameworks}
        placeholder="Select a framework..."
        validationState="invalid"
      >
        <ComboboxInput aria-invalid="true" placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
      <Combobox
        itemComponent={(props) => (
          <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
        )}
        multiple={true}
        options={frameworks}
        placeholder="Select a framework..."
        validationState="invalid"
      >
        <ComboboxInput aria-invalid="true" multiple={true} placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
      <Field data-invalid>
        <FieldLabel for="combobox-framework-invalid">Framework</FieldLabel>
        <Combobox
          itemComponent={(props) => (
            <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
          )}
          options={frameworks}
          placeholder="Select a framework..."
          validationState="invalid"
        >
          <ComboboxInput
            aria-invalid="true"
            id="combobox-framework-invalid"
            placeholder="Select a framework..."
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
