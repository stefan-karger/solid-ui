import { For, type JSX, lazy, Match, Show, Suspense, Switch } from "solid-js"

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
import { type IconLibraryName, iconLibraries } from "~/registry/icon-libraries"

const IconLucide = lazy(() =>
  import("~/registry/icons/icon-lucide").then((mod) => ({
    default: mod.IconLucide
  }))
)

const IconTabler = lazy(() =>
  import("~/registry/icons/icon-tabler").then((mod) => ({
    default: mod.IconTabler
  }))
)

const PREVIEW_ICONS: Record<IconLibraryName, string[]> = {
  lucide: [
    "CopyIcon",
    "CircleAlertIcon",
    "TrashIcon",
    "ShareIcon",
    "ShoppingBagIcon",
    "MoreHorizontalIcon",
    "Loader2Icon",
    "PlusIcon",
    "MinusIcon",
    "ArrowLeftIcon",
    "ArrowRightIcon",
    "CheckIcon",
    "ChevronDownIcon",
    "ChevronRightIcon"
  ],
  tabler: [
    "IconCopy",
    "IconExclamationCircle",
    "IconTrash",
    "IconShare",
    "IconShoppingBag",
    "IconDots",
    "IconLoader",
    "IconPlus",
    "IconMinus",
    "IconArrowLeft",
    "IconArrowRight",
    "IconCheck",
    "IconChevronDown",
    "IconChevronRight"
  ]
}

const logos: Record<IconLibraryName, JSX.Element> = {
  lucide: (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 12a4 4 0 0 0-8 0 8 8 0 1 0 16 0 11.97 11.97 0 0 0-4-8.944" />
      <path d="M10 12a4 4 0 0 0 8 0 8 8 0 1 0-16 0 11.97 11.97 0 0 0 4.063 9" />
    </svg>
  ),
  tabler: (
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M31.288 7.107A8.83 8.83 0 0 0 24.893.712a55.9 55.9 0 0 0-17.786 0A8.83 8.83 0 0 0 .712 7.107a55.9 55.9 0 0 0 0 17.786 8.83 8.83 0 0 0 6.395 6.395c5.895.95 11.89.95 17.786 0a8.83 8.83 0 0 0 6.395-6.395c.95-5.895.95-11.89 0-17.786"
        fill="currentColor"
      />
      <path
        d="m17.884 9.076 1.5-2.488 6.97 6.977-2.492 1.494zm-7.96 3.127 7.814-.909 3.91 3.66-.974 7.287-9.582 2.159a3.06 3.06 0 0 1-2.17-.329l5.244-4.897c.91.407 2.003.142 2.587-.626.584-.77.488-1.818-.226-2.484s-1.84-.755-2.664-.21c-.823.543-1.107 1.562-.67 2.412l-5.245 4.89a2.53 2.53 0 0 1-.339-2.017z"
        fill="#fff"
      />
    </svg>
  )
}

export function IconLibraryPicker() {
  const { iconLibrary, setIconLibrary } = useDesignSystem()
  const libraries = Object.values(iconLibraries)
  const selectedLibrary = () => iconLibraries[iconLibrary()]

  return (
    <div class="group/picker relative">
      <Picker>
        <PickerTrigger aria-label="Icon library">
          <div class="flex min-w-0 flex-col">
            <span class="text-muted-foreground text-xs">Icon Library</span>
            <span class="truncate font-medium">{selectedLibrary().title}</span>
          </div>
          <span class="-translate-y-1/2 pointer-events-none absolute top-1/2 right-4 flex size-4 select-none items-center justify-center [&_svg]:size-4">
            {logos[selectedLibrary().name]}
          </span>
        </PickerTrigger>
        <PickerContent class="md:w-72">
          <PickerRadioGroup
            onChange={(value) => {
              if (value in iconLibraries) {
                setIconLibrary(value as IconLibraryName)
              }
            }}
            value={iconLibrary()}
          >
            <PickerGroup>
              <For each={libraries}>
                {(library, index) => (
                  <>
                    <PickerRadioItem
                      class="py-2 pr-2 *:data-[slot=dropdown-menu-radio-item-indicator]:hidden"
                      value={library.name}
                    >
                      <div class="flex w-full flex-col gap-1">
                        <div class="font-medium text-muted-foreground text-xs">{library.title}</div>
                        <IconLibraryPreview iconLibrary={library.name} />
                      </div>
                    </PickerRadioItem>
                    <Show when={index() < libraries.length - 1}>
                      <PickerSeparator class="opacity-50" />
                    </Show>
                  </>
                )}
              </For>
            </PickerGroup>
          </PickerRadioGroup>
        </PickerContent>
      </Picker>
      <LockButton class="-translate-y-1/2 absolute top-1/2 right-10" param="iconLibrary" />
    </div>
  )
}

function IconLibraryPreview(props: { iconLibrary: IconLibraryName }) {
  const previewIcons = PREVIEW_ICONS[props.iconLibrary]

  return (
    <Suspense
      fallback={
        <div class="-mx-1 grid w-full grid-cols-7 gap-2">
          <For each={previewIcons}>
            {() => <div class="size-5 animate-pulse rounded bg-muted" />}
          </For>
        </div>
      }
    >
      <div class="-mx-1 grid w-full grid-cols-7 gap-2">
        <For each={previewIcons}>
          {(iconName) => (
            <div class="flex size-5 items-center justify-center *:[svg]:size-4">
              <Switch>
                <Match when={props.iconLibrary === "lucide"}>
                  <IconLucide name={iconName} />
                </Match>
                <Match when={props.iconLibrary === "tabler"}>
                  <IconTabler name={iconName} />
                </Match>
              </Switch>
            </div>
          )}
        </For>
      </div>
    </Suspense>
  )
}
