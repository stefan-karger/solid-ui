import { ChevronDown } from "lucide-solid";
import { cva } from "class-variance-authority";
import { type ComponentProps, type JSX, type ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic";
import * as NavigationMenuPrimitive from "@kobalte/core/navigation-menu";

import { cn } from "~/lib/utils";

type NavigationMenuProps<T extends ValidComponent = "ul"> = PolymorphicProps<
  T,
  NavigationMenuPrimitive.NavigationMenuRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const NavigationMenu = <T extends ValidComponent = "ul">(props: NavigationMenuProps<T>) => {
  const mergedProps = mergeProps({ gutter: 8, placement: "bottom-start" }, props);
  const [local, others] = splitProps(mergedProps as NavigationMenuProps, ["class", "children"]);
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      class={cn(
        "group/navigation-menu relative cn-navigation-menu flex max-w-max flex-1 items-center justify-center",
        local.class,
      )}
      {...others}
    >
      <div
        data-slot="navigation-menu-list"
        class="group cn-navigation-menu-list flex flex-1 list-none items-center justify-center"
      >
        {local.children}
      </div>
      <NavigationMenuPrimitive.Viewport class="origin-(--kb-menu-content-transform-origin)" />
    </NavigationMenuPrimitive.Root>
  );
};

type NavigationMenuItemProps = ComponentProps<"div">;

const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <NavigationMenuPrimitive.Menu>
      <div
        data-slot="navigation-menu-item"
        class={cn("relative cn-navigation-menu-item", local.class)}
        {...others}
      />
    </NavigationMenuPrimitive.Menu>
  );
};

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger cn-navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none",
);

type NavigationMenuTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  NavigationMenuPrimitive.NavigationMenuTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const NavigationMenuTrigger = <T extends ValidComponent = "div">(
  props: NavigationMenuTriggerProps<T>,
) => {
  const [local, others] = splitProps(props as NavigationMenuTriggerProps, ["class", "children"]);
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      class={cn(navigationMenuTriggerStyle(), "group", local.class)}
      {...others}
    >
      {local.children}
      <ChevronDown class="cn-navigation-menu-trigger-icon" aria-hidden="true" />
    </NavigationMenuPrimitive.Trigger>
  );
};

type NavigationMenuContentProps<T extends ValidComponent = "ul"> = PolymorphicProps<
  T,
  NavigationMenuPrimitive.NavigationMenuContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const NavigationMenuContent = <T extends ValidComponent = "ul">(
  props: NavigationMenuContentProps<T>,
) => {
  const [local, others] = splitProps(props as NavigationMenuContentProps, ["class"]);
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Content
        data-slot="navigation-menu-content"
        class={cn(
          "absolute top-0 cn-navigation-menu-content h-full w-auto origin-(--kb-menu-content-transform-origin) **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0",
          local.class,
        )}
        {...others}
      />
    </NavigationMenuPrimitive.Portal>
  );
};

type NavigationMenuLinkProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  ComponentProps<"a"> & {
    class?: string;
    children?: JSX.Element;
  }
>

const NavigationMenuLink = (props: NavigationMenuLinkProps) => {
  const [local, others] = splitProps(props, ["class", "as"])
  return (
    <Polymorphic
      as={local.as}
      data-slot="navigation-menu-link"
      class={cn("cn-navigation-menu-link", local.class)}
      {...others}
    />
  );
};

type NavigationMenuIndicatorProps = ComponentProps<"div"> & {
  class?: string;
};

const NavigationMenuIndicator = (props: NavigationMenuIndicatorProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="navigation-menu-indicator"
      class={cn(
        "top-full z-1 cn-navigation-menu-indicator flex h-1.5 items-end justify-center overflow-hidden",
        local.class,
      )}
      {...others}
    >
      <div class="relative top-[60%] cn-navigation-menu-indicator-arrow h-2 w-2 rotate-45" />
    </div>
  );
};

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
