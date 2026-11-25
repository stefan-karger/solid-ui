import { For, Show } from "solid-js"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator
} from "~/registry/ui/combobox"

const timezones = [
  {
    value: "Americas",
    items: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo"
    ]
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam"
    ]
  },
  {
    value: "Asia/Pacific",
    items: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul"
    ]
  }
] as const

export default function ComboboxWithGroupsAndSeparator() {
  return (
    <Combobox<string>>
      <ComboboxInput
        placeholder="Select a timezone"
        aria-label="Select a timezone"
      />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          <For each={timezones}>
            {(group, index) => (
              <>
                <Show when={index() !== 0}>
                  <ComboboxSeparator />
                </Show>
                <ComboboxGroup>
                  <ComboboxLabel>{group.value}</ComboboxLabel>
                  <For each={group.items}>
                    {(item) => <ComboboxItem value={item}>{item}</ComboboxItem>}
                  </For>
                </ComboboxGroup>
              </>
            )}
          </For>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
