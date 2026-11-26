import {
  baseColors,
  defaultPreset,
  encodePreset,
  presetOptions,
  type Preset
} from "@solid-ui/registry/preset"
import { fontFamilies } from "@solid-ui/registry/theme"
import { type JSX } from "@solidjs/web"
import { createEffect, createSignal, For, onSettled, Show } from "solid-js"

import { copyToClipboard } from "~/lib/clipboard"
import {
  editPreset,
  parseEditorPreset,
  shufflePreset,
  type PresetField
} from "~/lib/presets/editor"
import {
  presetPreviewPath,
  presetShortcut,
  presetShortcutMessage,
  presetUpdateMessage
} from "~/lib/presets/preview-channel"
import { fontGroups, fontLabel, presetColorSwatch } from "~/lib/presets/theme"
import { Button } from "~/registry/ui/button"

import { createActionClass, OpenPreset } from "./open-preset"
import { PickerSeparator } from "./picker"
import {
  PresetPicker,
  PresetRadioSections,
  type PickerOption,
  type PickerSection
} from "./preset-picker"
import { StyleGlyph } from "./style-glyph"

// Picker order, labels and grouping follow shadcn/ui 055aa6b,
// apps/v4/app/(app)/(create)/components/customizer.tsx (MIT).
const groups = [
  ["style"],
  ["baseColor", "theme", "chartColor"],
  ["fontHeading", "font"],
  ["radius"],
  ["menuColor", "menuAccent"]
] as const satisfies readonly (readonly PresetField[])[]
const labels: Record<PresetField, string> = {
  style: "Style",
  baseColor: "Base Color",
  theme: "Theme",
  chartColor: "Chart Color",
  fontHeading: "Heading",
  font: "Font",
  radius: "Radius",
  menuColor: "Menu",
  menuAccent: "Menu Accent"
}
const styleOrder = [
  "vega",
  "nova",
  "maia",
  "lyra",
  "mira",
  "luma",
  "sera",
  "rhea"
] as const satisfies readonly Preset["style"][]
const previewDelay = 50

type MenuTone = "default" | "inverted"
type MenuSurface = "solid" | "translucent"

function menuParts(value: Preset["menuColor"]) {
  return {
    tone: (value.startsWith("inverted") ? "inverted" : "default") as MenuTone,
    surface: (value.endsWith("translucent")
      ? "translucent"
      : "solid") as MenuSurface
  }
}

function menuColor(tone: MenuTone, surface: MenuSurface): Preset["menuColor"] {
  return surface === "translucent" ? `${tone}-translucent` : tone
}

function optionLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function fontFamily(font: Preset["font"]) {
  return `"${fontFamilies[font]}"`
}

function Swatch(props: { color: string }) {
  return (
    <span
      class="size-4 rounded-full"
      style={{ "background-color": props.color }}
    />
  )
}

// Trigger glyphs from shadcn/ui 055aa6b (MIT): the radius corner, Hugeicons Menu02Icon
// and the menu accent bucket.
const samples: Record<PresetField, (preset: Preset) => JSX.Element> = {
  style: (preset) => <StyleGlyph style={preset.style} />,
  baseColor: (preset) => <Swatch color={presetColorSwatch(preset.baseColor)} />,
  theme: (preset) => <Swatch color={presetColorSwatch(preset.theme)} />,
  chartColor: (preset) => (
    <Swatch color={presetColorSwatch(preset.chartColor)} />
  ),
  fontHeading: (preset) => (
    <span
      style={{
        "font-family": fontFamily(
          preset.fontHeading === "inherit" ? preset.font : preset.fontHeading
        )
      }}
    >
      Aa
    </span>
  ),
  font: (preset) => (
    <span style={{ "font-family": fontFamily(preset.font) }}>Aa</span>
  ),
  radius: () => (
    <svg
      class="size-4 rotate-90"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path d="M4 20v-5C4 8.925 8.925 4 15 4h5" />
    </svg>
  ),
  menuColor: () => (
    <svg
      class="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path d="M4 5L16 5" />
      <path d="M4 12L20 12" />
      <path d="M4 19L12 19" />
    </svg>
  ),
  menuAccent: (preset) => (
    <svg
      class="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <g
        data-accent={preset.menuAccent}
        class="fill-muted-foreground/30 data-[accent=bold]:fill-foreground"
      >
        <path d="M19 12.1294L12.9388 18.207C11.1557 19.9949 10.2641 20.8889 9.16993 20.9877C8.98904 21.0041 8.80705 21.0041 8.62616 20.9877C7.53195 20.8889 6.64039 19.9949 4.85726 18.207L2.83687 16.1811C1.72104 15.0622 1.72104 13.2482 2.83687 12.1294M19 12.1294L10.9184 4.02587M19 12.1294H2.83687M10.9184 4.02587L2.83687 12.1294M10.9184 4.02587L8.89805 2" />
        <path d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 20 17 20 17C20 17 22 18.8954 22 20Z" />
      </g>
    </svg>
  )
}

export default function CreateEditor() {
  const [preset, setPreset] = createSignal(defaultPreset)
  const [preview, setPreview] = createSignal<Preset | null>(null)
  const [locks, setLocks] = createSignal<ReadonlySet<PresetField>>(new Set())
  const [mobile, setMobile] = createSignal(false)
  const [ready, setReady] = createSignal(false)
  const [open, setOpen] = createSignal(false)
  const [copyFeedback, setCopyFeedback] = createSignal("")
  const [notice, setNotice] = createSignal("")
  const [panel, setPanel] = createSignal<HTMLElement>()
  let iframe: HTMLIFrameElement | undefined
  let previewTimer: number | undefined
  // A solid menu restores the accent it had before switching to translucent.
  let solidMenuAccent: Preset["menuAccent"] = defaultPreset.menuAccent

  const code = () => encodePreset(preset())
  const previewCode = () => encodePreset(preview() ?? preset())
  function sendPreset(value: string) {
    iframe?.contentWindow?.postMessage(
      { type: presetUpdateMessage, code: value },
      location.origin
    )
  }

  function schedulePreview(next: Preset | null) {
    window.clearTimeout(previewTimer)
    if (!next) return
    previewTimer = window.setTimeout(() => setPreview(next), previewDelay)
  }

  function clearPreview() {
    window.clearTimeout(previewTimer)
    setPreview(null)
  }

  function setCurrent(next: Preset) {
    if (!next.menuColor.endsWith("translucent"))
      solidMenuAccent = next.menuAccent
    setPreset(next)
    clearPreview()
  }

  function readUrl() {
    const code = new URLSearchParams(location.search).get("preset")
    const parsed = code === null ? defaultPreset : parseEditorPreset(code)
    setCurrent(parsed ?? defaultPreset)
    setCopyFeedback("")
    setNotice(
      parsed
        ? ""
        : "This preset is unsupported or invalid. Showing the default preset."
    )
  }

  function commit(next: Preset) {
    const nextCode = encodePreset(next)
    setCurrent(next)
    setCopyFeedback("")
    setNotice("")
    const url = new URL(location.href)
    if (url.searchParams.get("preset") === nextCode) return
    url.searchParams.set("preset", nextCode)
    history.pushState(null, "", url)
  }

  function shuffle() {
    const next = shufflePreset(preset(), locks())
    if (next) commit(next)
    else setNotice("No other preset matches the locked values.")
  }

  function runShortcut(key: "o" | "r") {
    if (open()) return
    if (key === "o") setOpen(true)
    else shuffle()
  }

  onSettled(() => {
    const viewport = matchMedia("(width < 48rem)")
    const syncViewport = () => setMobile(viewport.matches)
    const onKeydown = (event: KeyboardEvent) => {
      const key = presetShortcut(event)
      if (!key || open()) return
      event.preventDefault()
      runShortcut(key)
    }
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        event.source !== iframe?.contentWindow ||
        event.data?.type !== presetShortcutMessage
      )
        return
      if (event.data.key === "o" || event.data.key === "r")
        runShortcut(event.data.key)
    }
    syncViewport()
    readUrl()
    setReady(true)
    viewport.addEventListener("change", syncViewport)
    window.addEventListener("popstate", readUrl)
    window.addEventListener("message", onMessage)
    document.addEventListener("keydown", onKeydown)
    return () => {
      window.clearTimeout(previewTimer)
      viewport.removeEventListener("change", syncViewport)
      window.removeEventListener("popstate", readUrl)
      window.removeEventListener("message", onMessage)
      document.removeEventListener("keydown", onKeydown)
    }
  })
  createEffect(
    () => (ready() ? previewCode() : null),
    (value) => {
      if (value !== null) sendPreset(value)
    }
  )
  createEffect(copyFeedback, (value) => {
    if (!value) return
    const timeout = window.setTimeout(() => setCopyFeedback(""), 2000)
    return () => window.clearTimeout(timeout)
  })

  function toggleLock(field: PresetField) {
    clearPreview()
    setNotice("")
    setLocks((previous) => {
      const next = new Set(previous)
      if (!next.delete(field)) next.add(field)
      return next
    })
  }

  function edit(field: PresetField, value: string) {
    const current = preset()
    const next = editPreset(current, field, value, locks())
    if (
      field !== "menuColor" ||
      !next ||
      value.endsWith("translucent") ||
      !current.menuColor.endsWith("translucent") ||
      locks().has("menuAccent")
    )
      return next
    return editPreset(next, "menuAccent", solidMenuAccent, locks()) ?? next
  }

  function select(field: PresetField, value: string) {
    const next = edit(field, value)
    if (next && next !== preset()) commit(next)
  }

  function option(
    field: PresetField,
    value: string,
    label = optionLabel(value)
  ): PickerOption {
    return { value, label, disabled: edit(field, value) === null }
  }

  function fontSections(field: "font" | "fontHeading"): PickerSection[] {
    return fontGroups.map((group) => ({
      key: group.label,
      label: group.label,
      options: group.fonts.map((font) => option(field, font, fontLabel(font)))
    }))
  }

  function sections(
    field: Exclude<PresetField, "menuColor">
  ): readonly PickerSection[] {
    const current = preset()
    switch (field) {
      case "style":
        return [
          { key: field, options: styleOrder.map((v) => option(field, v)) }
        ]
      case "baseColor":
        return [
          {
            key: field,
            options: baseColors
              .filter((color) => color !== "gray")
              .map((color) => option(field, color))
          }
        ]
      case "theme":
      case "chartColor":
        return [
          { key: "base", options: [option(field, current.baseColor)] },
          {
            key: "colors",
            options: presetOptions[field]
              .filter((color) => !baseColors.some((base) => base === color))
              .map((color) => option(field, color))
          }
        ]
      case "radius":
        return [
          { key: "default", options: [option(field, "default")] },
          {
            key: "sizes",
            options: presetOptions.radius
              .filter((radius) => radius !== "default")
              .map((radius) => option(field, radius))
          }
        ]
      case "fontHeading":
        return [
          {
            key: "inherit",
            options: [option(field, "inherit", fontLabel(current.font))]
          },
          ...fontSections(field)
        ]
      case "font":
        return fontSections(field)
      case "menuAccent":
        return [
          {
            key: field,
            options: presetOptions.menuAccent.map((v) => option(field, v))
          }
        ]
    }
  }

  function display(field: PresetField) {
    const current = preset()
    if (field === "font") return fontLabel(current.font)
    if (field === "fontHeading")
      return fontLabel(
        current.fontHeading === "inherit" ? current.font : current.fontHeading
      )
    if (field === "menuColor") {
      const { tone, surface } = menuParts(current.menuColor)
      return `${optionLabel(tone)} / ${optionLabel(surface)}`
    }
    return optionLabel(current[field])
  }

  function MenuColorSections() {
    const parts = () => menuParts(preset().menuColor)
    const tone = (value: MenuTone) => menuColor(value, parts().surface)
    const surface = (value: MenuSurface) => menuColor(parts().tone, value)
    const choice = (
      key: string,
      label: string,
      values: readonly string[],
      toValue: (value: string) => Preset["menuColor"]
    ): PickerSection[] => [
      {
        key,
        label,
        options: values.map((value) => ({
          ...option("menuColor", toValue(value)),
          value,
          label: optionLabel(value)
        }))
      }
    ]
    const radio = (
      label: string,
      value: string,
      sectionList: PickerSection[],
      toValue: (value: string) => Preset["menuColor"]
    ) => (
      <PresetRadioSections
        label={label}
        value={value}
        sections={sectionList}
        mobile={mobile()}
        onSelect={(next) => select("menuColor", toValue(next))}
        onPreview={(next) => schedulePreview(edit("menuColor", toValue(next)))}
      />
    )
    return (
      <>
        {radio(
          "Menu color",
          parts().tone,
          choice("tone", "Color", ["default", "inverted"], (value) =>
            tone(value as MenuTone)
          ),
          (value) => tone(value as MenuTone)
        )}
        <PickerSeparator />
        {radio(
          "Menu appearance",
          parts().surface,
          choice("surface", "Appearance", ["solid", "translucent"], (value) =>
            surface(value as MenuSurface)
          ),
          (value) => surface(value as MenuSurface)
        )}
      </>
    )
  }

  async function copyPreset() {
    const copiedCode = code()
    const copied = await copyToClipboard(`--preset ${copiedCode}`)
    if (copiedCode === code())
      setCopyFeedback(copied ? "Copied" : "Copy failed")
  }

  return (
    <div
      data-create-ready={ready() ? "true" : undefined}
      class="flex min-h-0 flex-1 flex-col gap-4 p-4 pt-1 md:flex-row-reverse md:gap-6 md:p-6 md:pt-1"
    >
      <div class="min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl bg-muted ring-1 ring-foreground/10">
        <iframe
          ref={(element) => {
            iframe = element
          }}
          src={presetPreviewPath}
          title="Preset preview"
          class="block size-full border-0"
          onLoad={() => {
            if (ready()) sendPreset(previewCode())
          }}
        />
      </div>
      {/* Card size="sm" geometry from shadcn/ui's customizer, in the docs site's dark Solid palette. */}
      <aside
        ref={(element) => {
          setPanel(element)
        }}
        class="dark isolate flex max-h-full min-h-0 w-full shrink-0 flex-col gap-3 self-start overflow-hidden rounded-2xl bg-background/90 pt-3 text-sm text-card-foreground ring-1 ring-foreground/10 backdrop-blur-xl md:w-48 2xl:w-56 [html.dark_&]:bg-card/90"
        aria-label="Preset settings"
      >
        <div class="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-3 md:overflow-y-auto">
          <div class="flex w-full flex-row gap-2.5 py-px md:flex-col md:gap-3.25">
            <For each={groups}>
              {(group, index) => (
                <>
                  <Show when={index() > 0}>
                    <div
                      aria-hidden="true"
                      class="relative -mx-3 -my-2 hidden h-5 shrink-0 md:block"
                    >
                      <div class="absolute inset-x-0 top-1/2 h-px bg-border" />
                    </div>
                  </Show>
                  <For each={group}>
                    {(field) => (
                      <PresetPicker
                        label={labels[field]}
                        value={display(field)}
                        sample={samples[field](preset())}
                        locked={locks().has(field)}
                        mobile={mobile()}
                        anchor={panel()}
                        disabled={
                          field === "radius" &&
                          (preset().style === "lyra" ||
                            preset().style === "sera")
                        }
                        class={
                          field === "menuAccent" ? "pr-3 md:pr-0" : undefined
                        }
                        contentClass={
                          field === "theme" || field === "chartColor"
                            ? "max-h-92"
                            : field === "font" || field === "fontHeading"
                              ? "max-h-96"
                              : undefined
                        }
                        onLock={() => toggleLock(field)}
                        onClose={clearPreview}
                      >
                        {field === "menuColor" ? (
                          <MenuColorSections />
                        ) : (
                          <PresetRadioSections
                            label={labels[field]}
                            value={preset()[field]}
                            sections={sections(field)}
                            mobile={mobile()}
                            onSelect={(value) => select(field, value)}
                            onPreview={(value) =>
                              schedulePreview(edit(field, value))
                            }
                          />
                        )}
                      </PresetPicker>
                    )}
                  </For>
                </>
              )}
            </For>
          </div>
        </div>
        <p
          role="status"
          class="px-3 text-xs text-muted-foreground empty:sr-only"
        >
          {notice()}
        </p>
        <div class="flex min-w-0 gap-2 border-t border-border bg-muted/50 p-3 md:flex-col">
          <Button
            variant="outline"
            class={createActionClass}
            aria-label="Copy preset"
            title={`--preset ${code()}`}
            onClick={copyPreset}
          >
            <span class="min-w-0 truncate">
              {copyFeedback() || `--preset ${code()}`}
            </span>
          </Button>
          <OpenPreset
            open={open()}
            mobile={mobile()}
            onOpenChange={setOpen}
            onImport={commit}
          />
          <Button variant="outline" class={createActionClass} onClick={shuffle}>
            Shuffle
          </Button>
        </div>
      </aside>
    </div>
  )
}
