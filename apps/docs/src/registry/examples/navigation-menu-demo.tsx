import { CircleAlert, CircleCheck, CircleDashed } from "lucide-solid";
import type { ComponentProps, JSX } from "solid-js";
import { For, splitProps } from "solid-js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/registry/ui/navigation-menu";

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/components/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/components/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/components/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll Area",
    href: "/docs/components/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/components/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="w-96 rounded-md border border-solid border-border bg-popover p-2">
            <ListItem href="/docs" title="Introduction">
              Re-usable components built with Tailwind CSS.
            </ListItem>
            <ListItem href="/docs/installation" title="Installation">
              How to install dependencies and structure your app.
            </ListItem>
            <ListItem href="/docs/components" title="Typography">
              Styles for headings, paragraphs, lists...etc
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem class="hidden md:flex">
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[400px] gap-2 rounded-md border border-solid border-border bg-popover p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <For each={components}>
              {(component) => (
                <ListItem href={component.href} title={component.title}>
                  {component.description}
                </ListItem>
              )}
            </For>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[200px] rounded-md  border border-solid border-border bg-popover p-2">
            <li>
              <NavigationMenuLink
                href="/docs/components/alert"
                class="flex-row items-center gap-2"
              >
                <CircleAlert />
                Backlog
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/docs/components/progress"
                class="flex-row items-center gap-2"
              >
                <CircleDashed />
                To Do
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/docs/components/checkbox"
                class="flex-row items-center gap-2"
              >
                <CircleCheck />
                Done
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/docs" class={navigationMenuTriggerStyle()}>
          Docs
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

type ListItemProps = ComponentProps<"li"> & {
  children: JSX.Element;
  href: string;
  title: string;
};

function ListItem(props: ListItemProps) {
  const [local, others] = splitProps(props, ["children", "href", "title"]);

  return (
    <li {...others}>
      <NavigationMenuLink href={local.href}>
        <div class="flex flex-col gap-1 text-sm">
          <div class="leading-none font-medium">{local.title}</div>
          <div class="line-clamp-2 text-muted-foreground">{local.children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  );
}
