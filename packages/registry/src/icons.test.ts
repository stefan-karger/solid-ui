import { describe, expect, it } from "vitest"

import { iconLibraries, iconPlaceholderNames, transformIcons } from "./icons.ts"

const source = `import { type ComponentProps } from "@solidjs/web"
import { Accordion as SdkAccordion } from "@ui-sdk/solid/accordion"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { cn } from "~/lib/utils"

export const sample = \`
import { Thing } from "elsewhere"
\`

export function Trigger(props: ComponentProps<"svg">) {
  return (
    <SdkAccordion>
      <IconPlaceholder
        lucide="ChevronDownIcon"
        class={cn("size-4 [&>path]:opacity-50", props.class)}
        data-slot="accordion-trigger-icon"
      />
      <IconPlaceholder lucide="CheckIcon" {...props} />
      <IconPlaceholder lucide="CheckIcon" />
    </SdkAccordion>
  )
}`

describe("transformIcons", () => {
  it("replaces each placeholder with the library's component", () => {
    expect(transformIcons(source, "lucide"))
      .toBe(`import CheckIcon from "@lucide/solid/icons/check"
import ChevronDownIcon from "@lucide/solid/icons/chevron-down"
import { type ComponentProps } from "@solidjs/web"
import { Accordion as SdkAccordion } from "@ui-sdk/solid/accordion"

import { cn } from "~/lib/utils"

export const sample = \`
import { Thing } from "elsewhere"
\`

export function Trigger(props: ComponentProps<"svg">) {
  return (
    <SdkAccordion>
      <ChevronDownIcon
        class={cn("size-4 [&>path]:opacity-50", props.class)}
        data-slot="accordion-trigger-icon"
      />
      <CheckIcon {...props} />
      <CheckIcon />
    </SdkAccordion>
  )
}`)
  })

  it("removes the group of a lone placeholder import", () => {
    const output = transformIcons(
      `import { omit } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"

export const Icon = () => <IconPlaceholder lucide="XIcon" />`,
      "lucide"
    )
    expect(output).toBe(`import XIcon from "@lucide/solid/icons/x"
import { omit } from "solid-js"

export const Icon = () => <XIcon />`)
  })

  it("adds the import above alias imports when there are no packages", () => {
    const output = transformIcons(
      `import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"

export const Icon = () => <IconPlaceholder lucide="XIcon" />`,
      "lucide"
    )
    expect(output).toBe(`import XIcon from "@lucide/solid/icons/x"

import { Button } from "~/registry/ui/button"

export const Icon = () => <XIcon />`)
  })

  it("leaves source without placeholders unchanged", () => {
    const plain = `import { omit } from "solid-js"\n`
    expect(transformIcons(plain, "lucide")).toBe(plain)
  })

  it("rejects a placeholder without the library's icon", () => {
    expect(() =>
      transformIcons(
        `const icon = <IconPlaceholder class="size-4" />`,
        "lucide"
      )
    ).toThrow("without a lucide icon")
  })

  it("rejects a placeholder with children", () => {
    expect(() =>
      transformIcons(
        `const icon = <IconPlaceholder lucide="X"></IconPlaceholder>`,
        "lucide"
      )
    ).toThrow("self-closing")
  })
})

describe("iconLibraries", () => {
  it("imports each Lucide icon from its own module", () => {
    const { module } = iconLibraries.lucide
    expect(module("ChevronDownIcon")).toBe("@lucide/solid/icons/chevron-down")
    expect(module("Settings2Icon")).toBe("@lucide/solid/icons/settings-2")
    expect(module("LoaderCircleIcon")).toBe("@lucide/solid/icons/loader-circle")
  })
})

describe("iconPlaceholderNames", () => {
  it("lists the library's icon for each placeholder", () => {
    expect(iconPlaceholderNames(source, "lucide")).toEqual([
      "ChevronDownIcon",
      "CheckIcon",
      "CheckIcon"
    ])
  })
})
