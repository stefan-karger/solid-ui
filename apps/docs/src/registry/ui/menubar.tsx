import { Check, ChevronRight } from "lucide-solid";

import type { Component, ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as MenubarPrimitive from "@kobalte/core/menubar";

import { cn } from "~/lib/utils";

type MenubarProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const Menubar = <T extends ValidComponent = "div">(props: MenubarProps<T>) => {
  const [local, others] = splitProps(props as MenubarProps, ["class"]);
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      class={cn("cn-menubar flex items-center", local.class)}
      {...others}
    />
  );
};

const MenubarMenu = (props: MenubarPrimitive.MenubarMenuProps) => {
  const mergedProps = mergeProps({ gutter: 8 }, props);
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...mergedProps} />;
};

type MenubarTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const MenubarTrigger = <T extends ValidComponent = "button">(props: MenubarTriggerProps<T>) => {
  const [local, others] = splitProps(props as MenubarTriggerProps, ["class", "children"]);
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      class={cn("cn-menubar-trigger flex select-none items-center outline-hidden", local.class)}
      {...others}
    >
      {local.children}
    </MenubarPrimitive.Trigger>
  );
};

const MenubarPortal: Component<MenubarPrimitive.MenubarPortalProps> = (props) => {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
};

type MenubarContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarContentProps<T>
> &
  Pick<ComponentProps<T>, "class">;

const MenubarContent = <T extends ValidComponent = "div">(props: MenubarContentProps<T>) => {
  const [local, others] = splitProps(props as MenubarContentProps, ["class"]);
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        class={cn("z-50 cn-menu-target cn-menubar-content min-w-48 overflow-hidden", local.class)}
        {...others}
      />
    </MenubarPortal>
  );
};

type MenubarGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">;

const MenubarGroup = <T extends ValidComponent = "div">(props: MenubarGroupProps<T>) => {
  const [local, others] = splitProps(props as MenubarGroupProps, ["class"]);
  return (
    <MenubarPrimitive.Group
      data-slot="menubar-group"
      class={cn("cn-menubar-group", local.class)}
      {...others}
    />
  );
};

type MenubarItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarItemProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  };

const MenubarItem = <T extends ValidComponent = "div">(props: MenubarItemProps<T>) => {
  const mergedProps = mergeProps(
    { variant: "default", inset: false } as MenubarItemProps<T>,
    props,
  );
  const [local, others] = splitProps(mergedProps as MenubarItemProps, [
    "class",
    "inset",
    "variant",
  ]);
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={local.inset || undefined}
      data-variant={local.variant}
      class={cn(
        "group/menubar-item relative cn-menubar-item flex cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    />
  );
};

type MenubarCheckboxItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarCheckboxItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const MenubarCheckboxItem = <T extends ValidComponent = "div">(
  props: MenubarCheckboxItemProps<T>,
) => {
  const [local, others] = splitProps(props as MenubarCheckboxItemProps, ["class", "children"]);
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      class={cn(
        "relative cn-menubar-checkbox-item flex cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    >
      <span class="pointer-events-none absolute cn-menubar-checkbox-item-indicator flex items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.CheckboxItem>
  );
};

type MenubarRadioGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRadioGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">;

const MenubarRadioGroup = <T extends ValidComponent = "div">(props: MenubarRadioGroupProps<T>) => {
  const [local, others] = splitProps(props as MenubarRadioGroupProps, ["class"]);
  return (
    <MenubarPrimitive.RadioGroup
      data-slot="menubar-radio-group"
      class={cn("cn-menubar-radio-group", local.class)}
      {...others}
    />
  );
};

type MenubarRadioItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRadioItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const MenubarRadioItem = <T extends ValidComponent = "div">(props: MenubarRadioItemProps<T>) => {
  const [local, others] = splitProps(props as MenubarRadioItemProps, ["class", "children"]);
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      class={cn(
        "relative cn-menubar-radio-item flex cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    >
      <span class="pointer-events-none absolute cn-menubar-radio-item-indicator flex items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.RadioItem>
  );
};

type MenubarGroupLabelProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarGroupLabelProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean;
  };

const MenubarLabel = <T extends ValidComponent = "span">(props: MenubarGroupLabelProps<T>) => {
  const mergedProps = mergeProps({ inset: false } as MenubarGroupLabelProps<T>, props);
  const [local, others] = splitProps(mergedProps as MenubarGroupLabelProps, ["class", "inset"]);
  return (
    <MenubarPrimitive.GroupLabel
      data-slot="menubar-label"
      data-inset={local.inset || undefined}
      class={cn("cn-menubar-label", local.class)}
      {...others}
    />
  );
};

type MenubarSeparatorProps<T extends ValidComponent = "hr"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSeparatorProps<T>
> &
  Pick<ComponentProps<T>, "class">;

const MenubarSeparator = <T extends ValidComponent = "hr">(props: MenubarSeparatorProps<T>) => {
  const [local, others] = splitProps(props as MenubarSeparatorProps, ["class"]);
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      class={cn("cn-menubar-separator -mx-1 my-1 h-px", local.class)}
      {...others}
    />
  );
};

type MenubarShortcutProps = ComponentProps<"span">;

const MenubarShortcut = (props: MenubarShortcutProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="menubar-shortcut"
      class={cn("cn-menubar-shortcut ml-auto", local.class)}
      {...others}
    />
  );
};

const MenubarSub: Component<MenubarPrimitive.MenubarSubProps> = (props) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
};

type MenubarSubTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSubTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    inset?: boolean;
  };

const MenubarSubTrigger = <T extends ValidComponent = "div">(props: MenubarSubTriggerProps<T>) => {
  const mergedProps = mergeProps({ inset: false } as MenubarSubTriggerProps<T>, props);
  const [local, others] = splitProps(mergedProps as MenubarSubTriggerProps, [
    "class",
    "inset",
    "children",
  ]);
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={local.inset || undefined}
      class={cn(
        "cn-menubar-sub-trigger flex cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    >
      {local.children}
      <ChevronRight class="ml-auto" />
    </MenubarPrimitive.SubTrigger>
  );
};

type MenubarSubContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSubContentProps<T>
> &
  Pick<ComponentProps<T>, "class">;

const MenubarSubContent = <T extends ValidComponent = "div">(props: MenubarSubContentProps<T>) => {
  const [local, others] = splitProps(props as MenubarSubContentProps, ["class"]);
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        data-slot="menubar-sub-content"
        class={cn("z-50 cn-menubar-sub-content min-w-32 overflow-hidden", local.class)}
        {...others}
      />
    </MenubarPrimitive.Portal>
  );
};

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
