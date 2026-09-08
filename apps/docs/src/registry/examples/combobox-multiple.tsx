import { For } from "solid-js"

import {
  Combobox,
  ComboboxChip,
  ComboboxChipInput,
  ComboboxChipRemove,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList
} from "~/registry/ui/combobox"

type Tag = {
  value: string
  label: string
}

const tags: Tag[] = [
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "engineering", label: "Engineering" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" }
]

export default function ComboboxMultiple() {
  return (
    <Combobox<Tag>
      multiple
      options={tags}
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      defaultValue={[tags[0]!]}
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
      )}
    >
      <ComboboxControl<Tag> class="max-w-md" variant="chips">
        {(state) => (
          <>
            <For each={state.selectedOptions()}>
              {(option) => (
                <ComboboxChip>
                  {option.label}
                  <ComboboxChipRemove
                    onClick={(event) => {
                      event.preventDefault()
                      state.remove(option)
                    }}
                  />
                </ComboboxChip>
              )}
            </For>
            <ComboboxChipInput class="min-w-24" placeholder="Add a tag" />
          </>
        )}
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxList />
        <ComboboxEmpty>No tag found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
