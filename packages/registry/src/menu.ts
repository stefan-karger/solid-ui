import { twMerge } from "tailwind-merge"

import type { Preset } from "./preset/codec.ts"

export type MenuColor = Preset["menuColor"]

// Menu surfaces carry two marker classes. The Create preview styles them
// through the preset; installed source gets them resolved here, as shadcn/ui
// 055aa6b does in packages/registry/src/transformers/transform-menu.ts (MIT).
export const MENU_MARKERS = ["cn-menu-target", "cn-menu-translucent"] as const

// Every style's `.cn-menu-translucent` rule applies these utilities; a docs
// test keeps the two in sync.
export const MENU_TRANSLUCENT_CLASSES =
  "relative animate-none! bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:**:text-accent-foreground! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:focus:bg-foreground/10!"

const STRING_LITERAL = /(["'`])(?:\\.|(?!\1)[\s\S])*?\1/g
const MARKER = /(?:^|\s)cn-menu-(?:target|translucent)(?=\s|$)/

// Resolves the markers for a menu color: an inverted menu takes the `dark`
// class, so it reads the dark tokens, and a translucent one takes the blur
// utilities. Markers the color doesn't use are removed.
export function transformMenu(source: string, menuColor: MenuColor): string {
  const inverted = menuColor.startsWith("inverted")
  const translucent = menuColor.endsWith("translucent")

  return source.replace(STRING_LITERAL, (literal, quote: string) => {
    const value = literal.slice(1, -1)
    if (!MARKER.test(value)) return literal
    if (quote === "`" && value.includes("${")) {
      throw new Error(
        "[menu] Cannot transform a menu marker in a template expression"
      )
    }

    let classes = value
      .split(/\s+/)
      .filter(Boolean)
      .flatMap((name) => {
        if (name === "cn-menu-target") return inverted ? ["dark"] : []
        if (name === "cn-menu-translucent") return []
        return [name]
      })
      .join(" ")
    if (translucent && /(?:^|\s)cn-menu-translucent(?=\s|$)/.test(value)) {
      classes = twMerge(classes, MENU_TRANSLUCENT_CLASSES)
    }

    return `${quote}${classes}${quote}`
  })
}
