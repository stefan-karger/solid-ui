import * as SheetPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cva, type VariantProps } from "class-variance-authority";
import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "~/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.CloseButton;

const portalVariants = cva("fixed inset-0 z-50 flex", {
  defaultVariants: { position: "right" },
  variants: {
    position: {
      bottom: "items-end",
      left: "justify-start",
      right: "justify-end",
      top: "items-start",
    },
  },
});

type PortalProps = SheetPrimitive.DialogPortalProps &
  VariantProps<typeof portalVariants>;

const SheetPortal: Component<PortalProps> = (props) => {
  const [local, others] = splitProps(props, ["position", "children"]);
  return (
    <SheetPrimitive.Portal {...others}>
      <div class={portalVariants({ position: local.position })}>
        {local.children}
      </div>
    </SheetPrimitive.Portal>
  );
};

type DialogOverlayProps<T extends ValidComponent = "div"> =
  SheetPrimitive.DialogOverlayProps<T> & {
    class?: string | undefined;
  };

const SheetOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogOverlayProps<T>>,
) => {
  const [local, others] = splitProps(props as DialogOverlayProps, ["class"]);
  return (
    <SheetPrimitive.Overlay
      class={cn(
        "data-[closed=]:fade-out-0 data-[expanded=]:fade-in-0 fixed inset-0 z-50 bg-black/80 data-[closed=]:animate-out data-[expanded=]:animate-in",
        local.class,
      )}
      {...others}
    />
  );
};

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[closed=]:animate-out data-[expanded=]:animate-in data-[closed=]:duration-300 data-[expanded=]:duration-500",
  {
    defaultVariants: {
      position: "right",
    },
    variants: {
      position: {
        bottom:
          "data-[closed=]:slide-out-to-bottom data-[expanded=]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
        left: "data-[closed=]:slide-out-to-left data-[expanded=]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right:
          "data-[closed=]:slide-out-to-right data-[expanded=]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
        top: "data-[closed=]:slide-out-to-top data-[expanded=]:slide-in-from-top inset-x-0 top-0 border-b",
      },
    },
  },
);

type DialogContentProps<T extends ValidComponent = "div"> =
  SheetPrimitive.DialogContentProps<T> &
    VariantProps<typeof sheetVariants> & {
      class?: string | undefined;
      children?: JSX.Element;
    };

const SheetContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogContentProps<T>>,
) => {
  const [local, others] = splitProps(props as DialogContentProps, [
    "position",
    "class",
    "children",
  ]);
  return (
    <SheetPortal position={local.position}>
      <SheetOverlay />
      <SheetPrimitive.Content
        class={cn(
          sheetVariants({ position: local.position }),
          local.class,
          "max-h-screen overflow-y-auto",
        )}
        {...others}
      >
        {local.children}
        <SheetPrimitive.CloseButton class="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <svg
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Close</title>
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
          <span class="sr-only">Close</span>
        </SheetPrimitive.CloseButton>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
};

const SheetHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        local.class,
      )}
      {...others}
    />
  );
};

const SheetFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        local.class,
      )}
      {...others}
    />
  );
};

type DialogTitleProps<T extends ValidComponent = "h2"> =
  SheetPrimitive.DialogTitleProps<T> & {
    class?: string | undefined;
  };

const SheetTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, DialogTitleProps<T>>,
) => {
  const [local, others] = splitProps(props as DialogTitleProps, ["class"]);
  return (
    <SheetPrimitive.Title
      class={cn("font-semibold text-foreground text-lg", local.class)}
      {...others}
    />
  );
};

type DialogDescriptionProps<T extends ValidComponent = "p"> =
  SheetPrimitive.DialogDescriptionProps<T> & { class?: string | undefined };

const SheetDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, DialogDescriptionProps<T>>,
) => {
  const [local, others] = splitProps(props as DialogDescriptionProps, [
    "class",
  ]);
  return (
    <SheetPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...others}
    />
  );
};

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
