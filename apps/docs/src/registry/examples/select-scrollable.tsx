import { Show } from "solid-js"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "~/registry/ui/select"

type TimezoneOption = {
  label: string
  value: string
}

type TimezoneGroup = {
  label: string
  options: TimezoneOption[]
}

const timezones: TimezoneGroup[] = [
  {
    label: "North America",
    options: [
      { label: "Eastern Standard Time", value: "est" },
      { label: "Central Standard Time", value: "cst" },
      { label: "Mountain Standard Time", value: "mst" },
      { label: "Pacific Standard Time", value: "pst" },
      { label: "Alaska Standard Time", value: "akst" },
      { label: "Hawaii Standard Time", value: "hst" }
    ]
  },
  {
    label: "Europe & Africa",
    options: [
      { label: "Greenwich Mean Time", value: "gmt" },
      { label: "Central European Time", value: "cet" },
      { label: "Eastern European Time", value: "eet" },
      { label: "Western European Summer Time", value: "west" },
      { label: "Central Africa Time", value: "cat" },
      { label: "East Africa Time", value: "eat" }
    ]
  },
  {
    label: "Asia",
    options: [
      { label: "Moscow Time", value: "msk" },
      { label: "India Standard Time", value: "ist" },
      { label: "China Standard Time", value: "cst_china" },
      { label: "Japan Standard Time", value: "jst" },
      { label: "Korea Standard Time", value: "kst" },
      { label: "Indonesia Central Standard Time", value: "icst" }
    ]
  },
  {
    label: "Australia & Pacific",
    options: [
      { label: "Australian Western Standard Time", value: "awst" },
      { label: "Australian Central Standard Time", value: "acst" },
      { label: "Australian Eastern Standard Time", value: "aest" },
      { label: "New Zealand Standard Time", value: "nzst" },
      { label: "Fiji Time", value: "fjt" }
    ]
  },
  {
    label: "South America",
    options: [
      { label: "Argentina Time", value: "art" },
      { label: "Bolivia Time", value: "bot" },
      { label: "Brasilia Time", value: "brt" },
      { label: "Chile Standard Time", value: "clt" }
    ]
  }
]

export default function SelectScrollable() {
  return (
    <Select<TimezoneOption, TimezoneGroup>
      options={timezones}
      optionGroupChildren="options"
      optionValue="value"
      optionTextValue="label"
      placeholder="Select a timezone"
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
      )}
      sectionComponent={(props) => (
        <>
          <Show when={props.section.index !== 0}>
            <SelectSeparator />
          </Show>
          <SelectGroup>
            <SelectLabel>{props.section.rawValue.label}</SelectLabel>
          </SelectGroup>
        </>
      )}
    >
      <SelectTrigger class="w-full max-w-64">
        <SelectValue<TimezoneOption>>{(state) => state.selectedOption()?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent class="no-scrollbar max-h-60" />
    </Select>
  )
}
