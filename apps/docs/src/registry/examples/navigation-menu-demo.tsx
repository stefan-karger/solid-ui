import type { JSX } from "@solidjs/web"
import { For } from "solid-js"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "~/registry/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/components/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response."
  },
  {
    title: "Hover Card",
    href: "/docs/components/hover-card",
    description: "For sighted users to preview content available behind a link."
  },
  {
    title: "Progress",
    href: "/docs/components/progress",
    description: "Displays an indicator showing the completion progress of a task."
  },
  {
    title: "Scroll-area",
    href: "/docs/components/scroll-area",
    description: "Visually or semantically separates content."
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    description: "A set of layered sections of content displayed one panel at a time."
  },
  {
    title: "Tooltip",
    href: "/docs/components/tooltip",
    description: "A popup that displays information related to an element on focus or hover."
  }
]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="w-96">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/components/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <For each={components}>
                {(component) => (
                  <ListItem title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                )}
              </For>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuTrigger as="a" href="/docs" class={navigationMenuTriggerStyle()}>
          Docs
        </NavigationMenuTrigger>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem(props: { href: string; title: string; children: JSX.Element }) {
  return (
    <NavigationMenuLink href={props.href}>
      <div class="flex flex-col gap-1 text-sm">
        <div class="leading-none font-medium">{props.title}</div>
        <div class="line-clamp-2 text-muted-foreground">{props.children}</div>
      </div>
    </NavigationMenuLink>
  )
}
