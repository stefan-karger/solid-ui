import { For, type JSX, splitProps } from "solid-js"

import { IconCircle, IconCircleCheck, IconCircleHelp } from "~/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuDescription,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLabel,
  NavigationMenuLink,
  NavigationMenuTrigger
} from "~/registry/v1/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response."
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link."
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content."
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time."
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
  }
]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          Home <NavigationMenuIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <NavigationMenuLink
            class="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline outline-hidden transition-all duration-200 focus:shadow-md md:p-6"
            href="/"
          >
            <NavigationMenuLabel class="mb-2 font-medium text-lg sm:mt-4">
              shadcn/ui
            </NavigationMenuLabel>
            <NavigationMenuDescription class="text-muted-foreground text-sm leading-tight">
              Beautifully designed components built with Tailwind CSS.
            </NavigationMenuDescription>
          </NavigationMenuLink>
          <ListItem href="/docs" title="Introduction">
            Re-usable components built using Radix UI and Tailwind CSS.
          </ListItem>
          <ListItem href="/docs/installation" title="Installation">
            How to install dependencies and structure your app.
          </ListItem>
          <ListItem href="/docs/primitives/typography" title="Typography">
            Styles for headings, paragraphs, lists...etc
          </ListItem>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          Components <NavigationMenuIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <For each={components}>
            {(component) => (
              <ListItem href={component.href} title={component.title}>
                {component.description}
              </ListItem>
            )}
          </For>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          List <NavigationMenuIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="grid w-[300px] gap-4">
          <NavigationMenuLink href="#">
            <NavigationMenuLabel>Components</NavigationMenuLabel>
            <NavigationMenuDescription>
              Browse all components in the library.
            </NavigationMenuDescription>
          </NavigationMenuLink>
          <NavigationMenuLink href="#">
            <NavigationMenuLabel>Documentation</NavigationMenuLabel>
            <NavigationMenuDescription>Learn how to use the library.</NavigationMenuDescription>
          </NavigationMenuLink>
          <NavigationMenuLink href="#">
            <NavigationMenuLabel>Blog</NavigationMenuLabel>
            <NavigationMenuDescription>Read our latest blog posts.</NavigationMenuDescription>
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          Simple <NavigationMenuIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="grid w-[200px] gap-4">
          <NavigationMenuLink href="#">Components</NavigationMenuLink>
          <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
          <NavigationMenuLink href="#">Blocks</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          With Icon <NavigationMenuIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="grid w-[200px] gap-4">
          <NavigationMenuLink class="flex-row items-center gap-2" href="#">
            <IconCircleHelp />
            Backlog
          </NavigationMenuLink>
          <NavigationMenuLink class="flex-row items-center gap-2" href="#">
            <IconCircle />
            To Do
          </NavigationMenuLink>
          <NavigationMenuLink class="flex-row items-center gap-2" href="#">
            <IconCircleCheck />
            Done
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  )
}

const ListItem = (props: { href: string; title: string; children?: JSX.Element }) => {
  const [local, other] = splitProps(props, ["href", "title", "children"])
  return (
    <NavigationMenuLink href={local.href} {...other}>
      <NavigationMenuLabel>{local.title}</NavigationMenuLabel>
      <NavigationMenuDescription>{local.children}</NavigationMenuDescription>
    </NavigationMenuLink>
  )
}
