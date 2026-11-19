import type { ComponentProps, JSX } from "@solidjs/web"
import {
  Combobox as SdkCombobox,
  ComboboxInput as SdkComboboxInput,
  ComboboxTrigger as SdkComboboxTrigger,
  ComboboxContent as SdkComboboxContent,
  ComboboxList as SdkComboboxList,
  ComboboxItem as SdkComboboxItem,
  ComboboxItemIndicator as SdkComboboxItemIndicator,
  ComboboxItemText as SdkComboboxItemText,
  ComboboxGroup as SdkComboboxGroup,
  ComboboxGroupLabel as SdkComboboxGroupLabel,
  ComboboxEmpty as SdkComboboxEmpty,
  ComboboxClear as SdkComboboxClear,
  ComboboxChips as SdkComboboxChips,
  ComboboxChip as SdkComboboxChip,
  ComboboxChipRemove as SdkComboboxChipRemove,
  ComboboxValue as SdkComboboxValue,
  ComboboxSeparator as SdkComboboxSeparator
} from "@ui-sdk/solid/combobox"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-solid"
import { omit, Show } from "solid-js"

import { cn } from "~/lib/utils"
import { InputGroup, InputGroupAddon, InputGroupButton } from "~/registry/ui/input-group"
const Combobox = SdkCombobox
const ComboboxValue = SdkComboboxValue
type ComboboxInputProps = Omit<ComponentProps<typeof SdkComboboxInput>, "class"> & {
  class?: string
  children?: JSX.Element
  showTrigger?: boolean
  showClear?: boolean
}
const ComboboxInput = (props: ComboboxInputProps) => {
  const rest = omit(props, "class", "children", "showTrigger", "showClear")
  return (
    <InputGroup class={cn("cn-combobox-input w-auto", props.class)}>
      <SdkComboboxInput
        {...rest}
        data-ui="input-group-control"
        class={cn(
          "cn-input cn-input-group-input w-full min-w-0 flex-1 outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
      <InputGroupAddon align="inline-end">
        <Show when={props.showTrigger !== false}>
          <ComboboxTrigger
            disabled={props.disabled}
            class="group-has-data-[slot=combobox-clear]/input-group:hidden"
          />
        </Show>
        <Show when={props.showClear}>
          <ComboboxClear disabled={props.disabled} />
        </Show>
      </InputGroupAddon>
      {props.children}
    </InputGroup>
  )
}
const ComboboxTrigger = (
  props: Omit<ComponentProps<typeof SdkComboboxTrigger>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkComboboxTrigger
    aria-label="Show options"
    render={(partProps) => <InputGroupButton {...partProps} size="icon-xs" variant="ghost" />}
    {...props}
    class={cn("cn-combobox-trigger", props.class)}
  >
    {props.children ?? <ChevronDownIcon class="cn-combobox-trigger-icon pointer-events-none" />}
  </SdkComboboxTrigger>
)
const ComboboxClear = (
  props: Omit<ComponentProps<typeof SdkComboboxClear>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkComboboxClear
    aria-label="Clear selection"
    render={(partProps) => <InputGroupButton {...partProps} size="icon-xs" variant="ghost" />}
    {...props}
    class={cn("cn-combobox-clear", props.class)}
  >
    <XIcon class="cn-combobox-clear-icon pointer-events-none" />
  </SdkComboboxClear>
)
const ComboboxContent = (
  props: Omit<ComponentProps<typeof SdkComboboxContent>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkComboboxContent
    sideOffset={6}
    align="start"
    {...props}
    class={cn(
      "cn-combobox-content cn-menu-target cn-menu-translucent group/combobox-content relative z-50 max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin)",
      props.class
    )}
  />
)
const ComboboxList = (
  props: Omit<ComponentProps<typeof SdkComboboxList>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkComboboxList
    {...props}
    class={cn("cn-combobox-list overflow-y-auto overscroll-contain", props.class)}
  />
)
const ComboboxItem = (
  props: Omit<ComponentProps<typeof SdkComboboxItem>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkComboboxItem
    {...props}
    class={cn(
      "cn-combobox-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      props.class
    )}
  >
    {props.children}
    <SdkComboboxItemIndicator class="cn-combobox-item-indicator">
      <CheckIcon class="cn-combobox-item-indicator-icon pointer-events-none" />
    </SdkComboboxItemIndicator>
  </SdkComboboxItem>
)
const ComboboxItemText = SdkComboboxItemText
const ComboboxGroup = (
  props: Omit<ComponentProps<typeof SdkComboboxGroup>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => <SdkComboboxGroup {...props} class={cn("cn-combobox-group", props.class)} />
const ComboboxLabel = (
  props: Omit<ComponentProps<typeof SdkComboboxGroupLabel>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => <SdkComboboxGroupLabel {...props} class={cn("cn-combobox-label", props.class)} />
const ComboboxEmpty = (
  props: Omit<ComponentProps<typeof SdkComboboxEmpty>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => <SdkComboboxEmpty {...props} class={cn("cn-combobox-empty", props.class)} />
const ComboboxSeparator = (
  props: Omit<ComponentProps<typeof SdkComboboxSeparator>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => <SdkComboboxSeparator {...props} class={cn("cn-combobox-separator", props.class)} />
const ComboboxChips = (
  props: Omit<ComponentProps<typeof SdkComboboxChips>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkComboboxChips
    render={InputGroup}
    {...props}
    class={cn("cn-combobox-chips flex-wrap", props.class)}
  />
)
const ComboboxChip = (
  props: Omit<ComponentProps<typeof SdkComboboxChip>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => <SdkComboboxChip {...props} class={cn("cn-combobox-chip", props.class)} />
const ComboboxChipRemove = (
  props: Omit<ComponentProps<typeof SdkComboboxChipRemove>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkComboboxChipRemove
    aria-label="Remove selection"
    {...props}
    class={cn("cn-combobox-chip-remove", props.class)}
  >
    {props.children ?? <XIcon class="cn-combobox-chip-indicator-icon" />}
  </SdkComboboxChipRemove>
)
const ComboboxChipInput = (
  props: Omit<ComponentProps<typeof SdkComboboxInput>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkComboboxInput
    data-ui="input-group-control"
    {...props}
    class={cn("min-w-24 flex-1 outline-none placeholder:text-muted-foreground", props.class)}
  />
)
export {
  Combobox,
  ComboboxValue,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxItemText,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChipInput
}
