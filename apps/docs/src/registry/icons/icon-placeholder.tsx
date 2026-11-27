import type { IconLibraryName } from "@solid-ui/registry/icons"
import { Dynamic, type ComponentProps } from "@solidjs/web"
import { omit, type Component } from "solid-js"

import * as lucide from "./__lucide__"

export type IconPlaceholderProps = Record<IconLibraryName, string> &
  ComponentProps<"svg">

// Lucide types optional props without `undefined`, which only differs under
// exactOptionalPropertyTypes; the SVG props pass through unchanged.
const icons = lucide as Record<string, Component<ComponentProps<"svg">>>

// Registry source names its icons through this component, one prop per icon
// library, after shadcn/ui 0e5b2e6,
// apps/v4/app/(app)/(create)/components/icon-placeholder.tsx (MIT). The docs
// render Lucide; solidui-cli and the docs' code views replace each
// placeholder with the project's library (see @solid-ui/registry/icons).
export function IconPlaceholder(props: IconPlaceholderProps) {
  const others = omit(props, "lucide")
  return <Dynamic component={icons[props.lucide]} {...others} />
}
