import type { Accessor, Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  Match,
  mergeProps,
  onCleanup,
  Show,
  Switch,
  splitProps,
  useContext
} from "solid-js"

import type { PolymorphicProps } from "@kobalte/core"
import { Polymorphic } from "@kobalte/core"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { useIsMobile } from "~/hooks/use-mobile"
import { cn } from "~/lib/utils"
import type { ButtonProps } from "~/registry/ui/button"
import { Button } from "~/registry/ui/button"
import { Input } from "~/registry/ui/input"
import { Separator } from "~/registry/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/registry/ui/sheet"
import { Skeleton } from "~/registry/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: Accessor<"expanded" | "collapsed">
  open: Accessor<boolean>
  setOpen: (open: boolean) => void
  openMobile: Accessor<boolean>
  setOpenMobile: (open: boolean) => void
  isMobile: Accessor<boolean>
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

type SidebarProviderProps = Omit<ComponentProps<"div">, "style"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: JSX.CSSProperties
}

const SidebarProvider: Component<SidebarProviderProps> = (rawProps) => {
  const props = mergeProps({ defaultOpen: true }, rawProps)
  const [local, others] = splitProps(props, [
    "defaultOpen",
    "open",
    "onOpenChange",
    "class",
    "style",
    "children"
  ])

  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = createSignal(false)

  // This is the internal state of the sidebar.
  // We use open and onOpenChange for control from outside the component.
  const [_open, _setOpen] = createSignal(local.defaultOpen)
  const open = () => local.open ?? _open()
  const setOpen = (value: boolean | ((value: boolean) => boolean)) => {
    if (local.onOpenChange) {
      return local.onOpenChange?.(typeof value === "function" ? value(open()) : value)
    }
    _setOpen(value)

    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open()}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }

  // Helper to toggle the sidebar.
  const toggleSidebar = () => {
    return isMobile() ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }

  // Adds a keyboard shortcut to toggle the sidebar.
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown))
  })

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = () => (open() ? "expanded" : "collapsed")

  const contextValue = {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        class={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          local.class
        )}
        data-slot="sidebar-wrapper"
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...local.style
        }}
        {...others}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  )
}

type SidebarProps = ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

const Sidebar: Component<SidebarProps> = (rawProps) => {
  const props = mergeProps<SidebarProps[]>(
    {
      side: "left",
      variant: "sidebar",
      collapsible: "offcanvas"
    },
    rawProps
  )
  const [local, others] = splitProps(props, ["side", "variant", "collapsible", "class", "children"])

  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  return (
    <Switch>
      <Match when={local.collapsible === "none"}>
        <div
          class={cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            local.class
          )}
          data-slot="sidebar"
          {...others}
        >
          {local.children}
        </div>
      </Match>
      <Match when={isMobile()}>
        <Sheet onOpenChange={setOpenMobile} open={openMobile()} {...others}>
          <SheetContent
            class="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            data-mobile="true"
            data-sidebar="sidebar"
            data-slot="sidebar"
            side={local.side}
            style={{
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE
            }}
          >
            <SheetHeader class="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div class="flex size-full flex-col">{local.children}</div>
          </SheetContent>
        </Sheet>
      </Match>
      <Match when={!isMobile()}>
        <div
          class="group peer hidden text-sidebar-foreground md:block"
          data-collapsible={state() === "collapsed" ? local.collapsible : ""}
          data-side={local.side}
          data-slot="sidebar"
          data-state={state()}
          data-variant={local.variant}
        >
          {/* This is what handles the sidebar gap on desktop */}
          <div
            class={cn(
              "relative cn-sidebar-gap w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              local.variant === "floating" || local.variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )}
            data-slot="sidebar-gap"
          />
          <div
            class={cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              local.side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              local.variant === "floating" || local.variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              local.class
            )}
            data-slot="sidebar-container"
            {...others}
          >
            <div
              class="cn-sidebar-inner flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
              data-sidebar="sidebar"
              data-slot="sidebar-inner"
            >
              {local.children}
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  )
}

type SidebarTriggerProps<T extends ValidComponent = "button"> = ButtonProps<T> & {
  onClick?: (event: MouseEvent) => void
}

const SidebarTrigger = <T extends ValidComponent = "button">(props: SidebarTriggerProps<T>) => {
  const [local, others] = splitProps(props as SidebarTriggerProps, ["class", "onClick"])
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      class={cn("cn-sidebar-trigger size-7", local.class)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(event: MouseEvent) => {
        local.onClick?.(event)
        toggleSidebar()
      }}
      size="icon"
      variant="ghost"
      {...others}
    >
      <svg
        class="size-4"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <path d="M9 3v18" />
      </svg>
      <span class="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

const SidebarRail: Component<ComponentProps<"button">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  const { toggleSidebar } = useSidebar()

  return (
    <button
      aria-label="Toggle Sidebar"
      class={cn(
        "cn-sidebar-rail -translate-x-1/2 group-data-[side=left]:-right-4 absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        local.class
      )}
      data-sidebar="rail"
      data-slot="sidebar-rail"
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle Sidebar"
      {...others}
    />
  )
}

const SidebarInset: Component<ComponentProps<"main">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <main
      class={cn(
        "cn-sidebar-inset relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
        local.class
      )}
      data-slot="sidebar-inset"
      {...others}
    />
  )
}

const SidebarInput = (props: ComponentProps<typeof Input>) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Input
      class={cn("cn-sidebar-input h-8 w-full bg-background shadow-none", local.class)}
      data-sidebar="input"
      data-slot="sidebar-input"
      {...others}
    />
  )
}

const SidebarHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-sidebar-header flex flex-col gap-2 p-2", local.class)}
      data-sidebar="header"
      data-slot="sidebar-header"
      {...others}
    />
  )
}

const SidebarFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-sidebar-footer flex flex-col gap-2 p-2", local.class)}
      data-sidebar="footer"
      data-slot="sidebar-footer"
      {...others}
    />
  )
}

type SidebarSeparatorProps<T extends ValidComponent = "hr"> = ComponentProps<typeof Separator<T>>

const SidebarSeparator = <T extends ValidComponent = "hr">(props: SidebarSeparatorProps<T>) => {
  const [local, others] = splitProps(props as SidebarSeparatorProps, ["class"])
  return (
    <Separator
      class={cn("cn-sidebar-separator mx-2 w-auto bg-sidebar-border", local.class)}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...others}
    />
  )
}

const SidebarContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-sidebar-content flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        local.class
      )}
      data-sidebar="content"
      data-slot="sidebar-content"
      {...others}
    />
  )
}

const SidebarGroup: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-sidebar-group relative flex w-full min-w-0 flex-col p-2", local.class)}
      data-sidebar="group"
      data-slot="sidebar-group"
      {...others}
    />
  )
}

type SidebarGroupLabelProps<T extends ValidComponent = "div"> = ComponentProps<T>

const SidebarGroupLabel = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SidebarGroupLabelProps<T>>
) => {
  const [local, others] = splitProps(props as SidebarGroupLabelProps, ["class"])

  return (
    <Polymorphic<SidebarGroupLabelProps>
      as="div"
      class={cn(
        "cn-sidebar-group-label flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        local.class
      )}
      data-sidebar="group-label"
      data-slot="sidebar-group-label"
      {...others}
    />
  )
}

type SidebarGroupActionProps<T extends ValidComponent = "button"> = ComponentProps<T>

const SidebarGroupAction = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, SidebarGroupActionProps<T>>
) => {
  const [local, others] = splitProps(props as SidebarGroupActionProps, ["class"])
  return (
    <Polymorphic<SidebarGroupActionProps>
      as="button"
      class={cn(
        "cn-sidebar-group-action absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        local.class
      )}
      data-sidebar="group-action"
      data-slot="sidebar-group-action"
      {...others}
    />
  )
}

const SidebarGroupContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-sidebar-group-content w-full text-sm", local.class)}
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      {...others}
    />
  )
}

const SidebarMenu: Component<ComponentProps<"ul">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ul
      class={cn("cn-sidebar-menu flex w-full min-w-0 flex-col gap-1", local.class)}
      data-sidebar="menu"
      data-slot="sidebar-menu"
      {...others}
    />
  )
}

const SidebarMenuItem: Component<ComponentProps<"li">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <li
      class={cn("group/menu-item relative", local.class)}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...others}
    />
  )
}

/*
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
*/
const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button cn-sidebar-menu-button flex w-full items-center overflow-hidden outline-hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-sidebar-menu-button-variant-default",
        outline: "cn-sidebar-menu-button-variant-outline",
      },
      size: {
        default: "cn-sidebar-menu-button-size-default",
        sm: "cn-sidebar-menu-button-size-sm",
        lg: "cn-sidebar-menu-button-size-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type SidebarMenuButtonProps<T extends ValidComponent = "button"> = ComponentProps<T> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    isActive?: boolean
    tooltip?: string
  }

const SidebarMenuButton = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, SidebarMenuButtonProps<T>>
) => {
  const props = mergeProps({ isActive: false, variant: "default", size: "default" }, rawProps)
  const [local, others] = splitProps(props as SidebarMenuButtonProps, [
    "isActive",
    "tooltip",
    "variant",
    "size",
    "class"
  ])
  const { isMobile, state } = useSidebar()

  const MenuButton = (props: SidebarMenuButtonProps) => {
    const [_local, _others] = splitProps(props, ["class"])
    return (
      <Polymorphic<SidebarMenuButtonProps>
        as="button"
        class={cn(
          sidebarMenuButtonVariants({ variant: local.variant, size: local.size }),
          _local.class,
          local.class
        )}
        data-active={local.isActive}
        data-sidebar="menu-button"
        data-size={local.size}
        data-slot="sidebar-menu-button"
        {..._others}
        {...others}
      />
    )
  }

  return (
    <Show fallback={<MenuButton />} when={local.tooltip}>
      <Tooltip placement="right">
        <TooltipTrigger as={MenuButton} class="w-full" />
        <TooltipContent hidden={state() !== "collapsed" || isMobile()}>
          {local.tooltip}
        </TooltipContent>
      </Tooltip>
    </Show>
  )
}

type SidebarMenuActionProps<T extends ValidComponent = "button"> = ComponentProps<T> & {
  showOnHover?: boolean
}

const SidebarMenuAction = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, SidebarMenuActionProps<T>>
) => {
  const props = mergeProps({ showOnHover: false }, rawProps)
  const [local, others] = splitProps(props as SidebarMenuActionProps, ["class", "showOnHover"])

  return (
    <Polymorphic<SidebarMenuActionProps>
      as="button"
      class={cn(
        "cn-sidebar-menu-action absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        local.class
      )}
      data-sidebar="menu-action"
      data-slot="sidebar-menu-action"
      {...others}
    />
  )
}

const SidebarMenuBadge: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-sidebar-menu-badge pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground text-xs tabular-nums",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.class
      )}
      data-sidebar="menu-badge"
      data-slot="sidebar-menu-badge"
      {...others}
    />
  )
}

type SidebarMenuSkeletonProps = ComponentProps<"div"> & {
  showIcon?: boolean
}

const SidebarMenuSkeleton: Component<SidebarMenuSkeletonProps> = (rawProps) => {
  const props = mergeProps({ showIcon: false }, rawProps)
  const [local, others] = splitProps(props, ["class", "showIcon"])

  // Random width between 50 to 90%.
  const width = createMemo(() => `${Math.floor(Math.random() * 40) + 50}%`)

  return (
    <div
      class={cn("cn-sidebar-menu-skeleton flex h-8 items-center gap-2 rounded-md px-2", local.class)}
      data-sidebar="menu-skeleton"
      data-slot="sidebar-menu-skeleton"
      {...others}
    >
      {local.showIcon && <Skeleton class="cn-sidebar-menu-skeleton-icon size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        class="cn-sidebar-menu-skeleton-text h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width()
        }}
      />
    </div>
  )
}

const SidebarMenuSub: Component<ComponentProps<"ul">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <ul
      class={cn(
        "cn-sidebar-menu-sub mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        local.class
      )}
      data-sidebar="menu-sub"
      data-slot="sidebar-menu-sub"
      {...others}
    />
  )
}

const SidebarMenuSubItem: Component<ComponentProps<"li">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <li
      class={cn("group/menu-sub-item relative", local.class)}
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      {...others}
    />
  )
}

type SidebarMenuSubButtonProps<T extends ValidComponent = "a"> = ComponentProps<T> & {
  size?: "sm" | "md"
  isActive?: boolean
}

const SidebarMenuSubButton = <T extends ValidComponent = "a">(
  rawProps: PolymorphicProps<T, SidebarMenuSubButtonProps<T>>
) => {
  const props = mergeProps({ size: "md" }, rawProps)
  const [local, others] = splitProps(props as SidebarMenuSubButtonProps, [
    "size",
    "isActive",
    "class"
  ])

  return (
    <Polymorphic<SidebarMenuSubButtonProps>
      as="a"
      class={cn(
        "cn-sidebar-menu-sub-button -translate-x-px flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        local.size === "sm" && "text-xs",
        local.size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        local.class
      )}
      data-active={local.isActive}
      data-sidebar="menu-sub-button"
      data-size={local.size}
      data-slot="sidebar-menu-sub-button"
      {...others}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
}
