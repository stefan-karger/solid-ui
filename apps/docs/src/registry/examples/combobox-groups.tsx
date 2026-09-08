import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSection,
  ComboboxSectionLabel,
  ComboboxTrigger
} from "~/registry/ui/combobox"
import { InputGroupAddon } from "~/registry/ui/input-group"

type App = {
  value: string
  label: string
}

type AppGroup = {
  group: string
  items: App[]
}

const appGroups: AppGroup[] = [
  {
    group: "Communication",
    items: [
      { value: "slack", label: "Slack" },
      { value: "teams", label: "Microsoft Teams" },
      { value: "discord", label: "Discord" }
    ]
  },
  {
    group: "Productivity",
    items: [
      { value: "notion", label: "Notion" },
      { value: "linear", label: "Linear" },
      { value: "figma", label: "Figma" }
    ]
  }
]

export default function ComboboxGroups() {
  return (
    <Combobox<App, AppGroup>
      options={appGroups}
      optionGroupChildren="items"
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      placeholder="Search apps"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
      )}
      sectionComponent={(props) => (
        <ComboboxSection>
          <ComboboxSectionLabel>{props.section.rawValue.group}</ComboboxSectionLabel>
        </ComboboxSection>
      )}
    >
      <ComboboxControl class="max-w-sm">
        <ComboboxInput />
        <InputGroupAddon align="inline-end">
          <ComboboxTrigger />
        </InputGroupAddon>
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxList />
        <ComboboxEmpty>No app found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
