import { For, Show } from "solid-js"

import { useDesignSystem } from "~/components/design-system-provider"
import { LockButton } from "~/components/lock-button"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerTrigger
} from "~/components/picker"
import { STYLES } from "~/registry/styles"

export function StylePicker() {
  const { style, setStyle } = useDesignSystem()

  return (
    <div class="group/picker relative">
      <Picker>
        <PickerTrigger aria-label="Style">
          <div class="flex min-w-0 flex-col">
            <span class="text-muted-foreground text-xs">Style</span>
            <span class="truncate font-medium">{style().title}</span>
          </div>
          <Show when={style().icon}>
            {(icon) => (
              <div class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 select-none items-center justify-center">
                {icon()}
              </div>
            )}
          </Show>
        </PickerTrigger>
        <PickerContent class="md:w-64">
          <PickerRadioGroup
            onChange={(value) => {
              const selectedStyle = STYLES.find((item) => item.name === value)
              if (selectedStyle) setStyle(selectedStyle)
            }}
            value={style().name}
          >
            <PickerGroup>
              <For each={STYLES}>
                {(item, index) => (
                  <>
                    <PickerRadioItem value={item.name}>
                      <div class="flex items-start gap-2">
                        <Show when={item.icon}>
                          {(icon) => (
                            <div class="flex size-4 translate-y-0.5 items-center justify-center">
                              {icon()}
                            </div>
                          )}
                        </Show>
                        <div class="flex flex-col justify-start pointer-coarse:gap-1">
                          <div>{item.title}</div>
                          <div class="pointer-coarse:text-sm text-muted-foreground text-xs">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </PickerRadioItem>
                    <Show when={index() < STYLES.length - 1}>
                      <PickerSeparator class="opacity-50" />
                    </Show>
                  </>
                )}
              </For>
            </PickerGroup>
          </PickerRadioGroup>
        </PickerContent>
      </Picker>
      <LockButton class="absolute top-1/2 right-10 -translate-y-1/2" param="style" />
    </div>
  )
}
