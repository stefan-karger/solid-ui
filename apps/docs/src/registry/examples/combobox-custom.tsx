import { Dynamic } from "@solidjs/web"
import { ChartNoAxesColumnIcon, MegaphoneIcon, PaletteIcon, type LucideIcon } from "lucide-solid"

import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemText,
  ComboboxList,
  ComboboxTrigger
} from "~/registry/ui/combobox"
import { InputGroupAddon } from "~/registry/ui/input-group"

type Repository = {
  value: string
  label: string
  description: string
  icon: LucideIcon
}

const repositories: Repository[] = [
  {
    value: "design-system",
    label: "design-system",
    description: "Shared components and tokens",
    icon: PaletteIcon
  },
  {
    value: "marketing-site",
    label: "marketing-site",
    description: "Landing pages and content",
    icon: MegaphoneIcon
  },
  {
    value: "analytics-api",
    label: "analytics-api",
    description: "Event ingestion service",
    icon: ChartNoAxesColumnIcon
  }
]

export default function ComboboxCustom() {
  return (
    <Combobox<Repository>
      options={repositories}
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
      placeholder="Select a repository"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <Dynamic class="size-4 text-muted-foreground" component={props.item.rawValue.icon} />
          <ComboboxItemText class="flex-col gap-0">
            <span class="font-medium">{props.item.rawValue.label}</span>
            <span class="text-xs text-muted-foreground">{props.item.rawValue.description}</span>
          </ComboboxItemText>
        </ComboboxItem>
      )}
    >
      <ComboboxControl class="max-w-md">
        <ComboboxInput />
        <InputGroupAddon align="inline-end">
          <ComboboxTrigger />
        </InputGroupAddon>
      </ComboboxControl>
      <ComboboxContent>
        <ComboboxList />
        <ComboboxEmpty>No repository found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
