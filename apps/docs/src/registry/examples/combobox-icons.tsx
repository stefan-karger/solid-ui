import { Show } from "solid-js"

import { GlobeIcon } from "lucide-solid"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxSection,
  ComboboxSectionLabel,
  ComboboxSeparator
} from "~/registry/ui/combobox"

import { InputGroupAddon } from "../ui/input-group"

type TimezoneOption = string

type TimezoneGroup = {
  label: string
  options: TimezoneOption[]
}

const timezones: TimezoneGroup[] = [
  {
    label: "Americas",
    options: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo"
    ]
  },
  {
    label: "Europe",
    options: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam"
    ]
  },
  {
    label: "Asia/Pacific",
    options: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul"
    ]
  }
]

export default function ComboboxWithIconAddon() {
  return (
    <Combobox<TimezoneOption, TimezoneGroup>
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
      )}
      optionGroupChildren="options"
      optionLabel={(opt) => opt}
      options={timezones}
      optionValue={(opt) => opt}
      placeholder="Select a timezone..."
      sectionComponent={(props) => (
        <>
          <Show when={props.section.index !== 0}>
            <ComboboxSeparator />
          </Show>
          <ComboboxSection>
            <ComboboxSectionLabel>{props.section.rawValue.label}</ComboboxSectionLabel>
          </ComboboxSection>
        </>
      )}
    >
      <ComboboxInput placeholder="Select a timezone...">
        <InputGroupAddon>
          <GlobeIcon class="size-4" />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent class="w-60">
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
