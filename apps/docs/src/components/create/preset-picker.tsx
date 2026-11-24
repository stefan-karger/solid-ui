import { type JSX } from "@solidjs/web"
import {
  Menu as SdkMenu,
  MenuGroup as SdkMenuGroup,
  MenuRadioGroup as SdkMenuRadioGroup
} from "@ui-sdk/solid/menu"
import { Toggle as SdkToggle } from "@ui-sdk/solid/toggle"
import { For, Show } from "solid-js"

import { cn } from "~/lib/utils"

import {
  PickerContent,
  PickerLabel,
  PickerRadioItem,
  PickerSeparator,
  PickerTrigger
} from "./picker"

export type PickerOption = {
  value: string
  label: string
  disabled?: boolean | undefined
}

export type PickerSection = {
  key: string
  label?: string
  options: readonly PickerOption[]
}

type Props = {
  label: string
  value: string
  sample: JSX.Element
  locked: boolean
  mobile: boolean
  anchor?: HTMLElement | undefined
  disabled?: boolean | undefined
  class?: string | undefined
  contentClass?: string | undefined
  onLock: () => void
  onClose: () => void
  children: JSX.Element
}

// Hugeicons SquareLock01Icon and SquareUnlock01Icon (MIT), as shadcn/ui's create lock button.
function LockGlyph(props: { locked: boolean }) {
  return (
    <svg
      aria-hidden="true"
      class="size-5 text-foreground"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 14V17.0023" />
      <path
        d={
          props.locked
            ? "M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5V9"
            : "M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C13.9593 2 15.8664 3.25221 16.5 5"
        }
      />
      <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z" />
    </svg>
  )
}

export function PresetPicker(props: Props) {
  return (
    <div
      class={cn("group/picker relative", props.class)}
      data-create-picker={props.label}
    >
      <SdkMenu
        onOpenChange={(open) => {
          if (!open) props.onClose()
        }}
      >
        <PickerTrigger
          aria-label={props.label}
          disabled={props.disabled ?? false}
        >
          <span class="flex flex-col justify-start text-start">
            <span class="text-xs text-muted-foreground">{props.label}</span>
            <span
              data-create-value
              class="line-clamp-1 block max-w-[80%] truncate text-sm font-medium text-foreground"
            >
              {props.value}
            </span>
          </span>
          <span
            aria-hidden="true"
            class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base text-foreground select-none md:right-2.5"
          >
            {props.sample}
          </span>
        </PickerTrigger>
        <PickerContent
          anchor={props.mobile ? (props.anchor ?? null) : null}
          side={props.mobile ? "top" : "right"}
          align={props.mobile ? "center" : "start"}
          class={props.contentClass}
          onPointerLeave={() => props.onClose()}
        >
          {props.children}
        </PickerContent>
      </SdkMenu>
      <SdkToggle
        aria-label={`Lock ${props.label}`}
        title={props.locked ? "Unlock" : "Lock"}
        pressed={props.locked}
        onPressedChange={props.onLock}
        class="absolute top-1/2 right-8 flex size-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded opacity-0 ring-foreground/60 transition-opacity outline-none group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 focus:opacity-100 focus-visible:ring-1 data-pressed:opacity-100 pointer-coarse:hidden"
      >
        <LockGlyph locked={props.locked} />
      </SdkToggle>
    </div>
  )
}

export function PresetRadioSections(props: {
  label: string
  value: string
  sections: readonly PickerSection[]
  mobile: boolean
  onSelect: (value: string) => void
  onPreview: (value: string) => void
}) {
  function preview(option: PickerOption) {
    if (!props.mobile && !option.disabled) props.onPreview(option.value)
  }
  return (
    <SdkMenuRadioGroup
      aria-label={props.label}
      value={props.value}
      onValueChange={props.onSelect}
    >
      <For each={props.sections} keyed={(section) => section.key}>
        {(section, index) => (
          <>
            <Show when={index() > 0}>
              <PickerSeparator />
            </Show>
            <SdkMenuGroup>
              <Show when={section().label}>
                {(label) => <PickerLabel>{label()}</PickerLabel>}
              </Show>
              <For each={section().options} keyed={(option) => option.value}>
                {(option) => (
                  <PickerRadioItem
                    value={option().value}
                    disabled={option().disabled ?? false}
                    closeOnSelect={props.mobile}
                    // Previews follow the settled pointer and keyboard focus, as shadcn's picker does.
                    onPointerMove={(event) => {
                      if (event.pointerType === "mouse") preview(option())
                    }}
                    onFocus={() => preview(option())}
                  >
                    {option().label}
                  </PickerRadioItem>
                )}
              </For>
            </SdkMenuGroup>
          </>
        )}
      </For>
    </SdkMenuRadioGroup>
  )
}
