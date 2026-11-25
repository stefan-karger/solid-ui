// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import {
  dynamic,
  type ComponentProps,
  type JSX,
  type ValidComponent
} from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import {
  isStatic,
  createContext,
  createMemo,
  createSignal,
  Match,
  merge,
  omit,
  onSettled,
  Show,
  Switch,
  useContext,
  type Accessor,
  type Component
} from "solid-js"

import { cn } from "~/lib/utils"
import { useIsMobile } from "~/registry/hooks/use-mobile"
import { Button, type ButtonProps } from "~/registry/ui/button"
import { Input } from "~/registry/ui/input"
import { Separator } from "~/registry/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "~/registry/ui/sheet"
import { Skeleton } from "~/registry/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

type PolymorphicProps<T extends ValidComponent, P> = Omit<
  P,
  "as" | "class" | "children"
> &
  Omit<
    ComponentProps<T>,
    keyof P | "as" | "class" | "children" | "onChange"
  > & {
    as?: T
    class?: string | undefined
    children?: JSX.Element
  }

const SIDEBAR_COOKIE_NAME = "sidebar_state"

const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

const SIDEBAR_WIDTH = "16rem"

const SIDEBAR_WIDTH_MOBILE = "18rem"

const SIDEBAR_WIDTH_ICON = "3rem"

const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: Accessor<"expanded" | "collapsed">
  open: Accessor<boolean>
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void
  openMobile: Accessor<boolean>
  setOpenMobile: (open: boolean | ((value: boolean) => boolean)) => void
  isMobile: Accessor<boolean>
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

type SidebarProviderProps = ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarProvider = (props: SidebarProviderProps) => {
  const local = merge({ defaultOpen: true }, props)
  const others = omit(
    props,
    "defaultOpen",
    "open",
    "onOpenChange",
    "class",
    "style",
    "children"
  )
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = createSignal(false)
  const [_open, _setOpen] = createSignal(local.defaultOpen)
  const open = () => local.open ?? _open()
  const setOpen = (value: boolean | ((value: boolean) => boolean)) => {
    if (local.onOpenChange) {
      local.onOpenChange(typeof value === "function" ? value(open()) : value)
      return
    }
    _setOpen(value)
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open()}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }
  const toggleSidebar = () => {
    return isMobile()
      ? setOpenMobile((isOpen) => !isOpen)
      : setOpen((isOpen) => !isOpen)
  }
  onSettled(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })
  const state = () => (open() ? "expanded" : "collapsed")
  const contextValue: SidebarContextProps = {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar
  }
  return (
    <SidebarContext value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...(local.style as JSX.CSSProperties)
        }}
        class={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          local.class
        )}
        {...others}
      >
        {local.children}
      </div>
    </SidebarContext>
  )
}

type SidebarProps = ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

const Sidebar: Component<SidebarProps> = (props) => {
  const local = merge<SidebarProps[]>(
    {
      side: "left",
      variant: "sidebar",
      collapsible: "offcanvas"
    },
    props
  )
  const others = omit(
    props,
    "side",
    "variant",
    "collapsible",
    "class",
    "children"
  )
  const mobileContentProps = others as unknown as Omit<
    ComponentProps<typeof SheetContent>,
    "class"
  >
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
        <Sheet onOpenChange={setOpenMobile} open={openMobile()}>
          <SheetContent
            class="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            data-mobile="true"
            data-sidebar="sidebar"
            data-slot="sidebar"
            side={local.side ?? "left"}
            style={{
              "--sidebar-width": "var(--sidebar-width-mobile)"
            }}
            {...mobileContentProps}
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
          data-state={state()}
          data-collapsible={state() === "collapsed" ? local.collapsible : ""}
          data-variant={local.variant}
          data-side={local.side}
          data-slot="sidebar"
        >
          <div
            data-slot="sidebar-gap"
            class={cn(
              "cn-sidebar-gap relative w-(--sidebar-width) bg-transparent",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              local.variant === "floating" || local.variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )}
          />
          <div
            data-slot="sidebar-container"
            class={cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              local.side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              local.variant === "floating" || local.variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              local.class
            )}
            {...others}
          >
            <div
              data-sidebar="sidebar"
              data-slot="sidebar-inner"
              class="cn-sidebar-inner flex size-full flex-col"
            >
              {local.children}
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  )
}

type SidebarTriggerProps = ButtonProps

const SidebarTrigger = (props: SidebarTriggerProps) => {
  const others = omit(props, "class", "onClick")
  const { toggleSidebar } = useSidebar()
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      class={cn("cn-sidebar-trigger", props.class)}
      onClick={(event: MouseEvent) => {
        // @ts-expect-error - preserves polymorphic trigger handler support
        props.onClick?.(event)
        toggleSidebar()
      }}
      {...others}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="size-4"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
      <span class="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

const SidebarRail = (props: ComponentProps<"button">) => {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabindex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      {...props}
      class={cn(
        "cn-sidebar-rail absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        props.class
      )}
    />
  )
}

const SidebarInset = (props: ComponentProps<"main">) => (
  <main
    data-slot="sidebar-inset"
    {...props}
    class={cn(
      "cn-sidebar-inset relative flex w-full flex-1 flex-col",
      props.class
    )}
  />
)

const SidebarInput = (props: ComponentProps<typeof Input>) => (
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    {...props}
    class={cn("cn-sidebar-input", props.class)}
  />
)

const SidebarHeader = (props: ComponentProps<"div">) => (
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    {...props}
    class={cn("cn-sidebar-header flex flex-col", props.class)}
  />
)

const SidebarFooter = (props: ComponentProps<"div">) => (
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    {...props}
    class={cn("cn-sidebar-footer flex flex-col", props.class)}
  />
)

type SidebarSeparatorProps = ComponentProps<typeof Separator>

const SidebarSeparator = (props: SidebarSeparatorProps) => (
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    {...props}
    class={cn("cn-sidebar-separator w-auto", props.class)}
  />
)

const SidebarContent = (props: ComponentProps<"div">) => (
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    {...props}
    class={cn(
      "cn-sidebar-content flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      props.class
    )}
  />
)

const SidebarGroup = (props: ComponentProps<"div">) => (
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    {...props}
    class={cn(
      "cn-sidebar-group relative flex w-full min-w-0 flex-col",
      props.class
    )}
  />
)

type SidebarGroupLabelProps<T extends ValidComponent = "div"> =
  PolymorphicProps<T, ComponentProps<T>>

const SidebarGroupLabel = <T extends ValidComponent = "div">(
  props: SidebarGroupLabelProps<T>
) => {
  const others = omit(props as SidebarGroupLabelProps, "class", "as")
  const Comp = dynamic(() => props.as ?? "div", {
    static: isStatic(props, "as")
  })
  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      class={cn(
        "cn-sidebar-group-label flex shrink-0 items-center outline-hidden [&>svg]:shrink-0",
        props.class
      )}
      {...others}
    />
  )
}

type SidebarGroupActionProps<T extends ValidComponent = "button"> =
  PolymorphicProps<T, ComponentProps<T>>

const SidebarGroupAction = <T extends ValidComponent = "button">(
  props: SidebarGroupActionProps<T>
) => {
  const others = omit(props as SidebarGroupActionProps, "class", "as")
  const Comp = dynamic(() => props.as ?? "button", {
    static: isStatic(props, "as")
  })
  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      class={cn(
        "cn-sidebar-group-action flex aspect-square items-center justify-center outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 md:after:hidden [&>svg]:shrink-0",
        props.class
      )}
      {...others}
    />
  )
}

const SidebarGroupContent = (props: ComponentProps<"div">) => (
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    {...props}
    class={cn("cn-sidebar-group-content w-full", props.class)}
  />
)

const SidebarMenu = (props: ComponentProps<"ul">) => (
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    {...props}
    class={cn("cn-sidebar-menu flex w-full min-w-0 flex-col", props.class)}
  />
)

const SidebarMenuItem = (props: ComponentProps<"li">) => (
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    {...props}
    class={cn("group/menu-item relative", props.class)}
  />
)

const sidebarMenuButtonVariants = cva(
  "peer/menu-button cn-sidebar-menu-button flex w-full items-center overflow-hidden outline-hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "cn-sidebar-menu-button-variant-default",
        outline: "cn-sidebar-menu-button-variant-outline"
      },
      size: {
        default: "cn-sidebar-menu-button-size-default",
        sm: "cn-sidebar-menu-button-size-sm",
        lg: "cn-sidebar-menu-button-size-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type SidebarMenuButtonProps<T extends ValidComponent = "button"> =
  PolymorphicProps<T, Pick<ComponentProps<T>, "class" | "children">> &
    VariantProps<typeof sidebarMenuButtonVariants> & {
      isActive?: boolean
      tooltip?: string
    }

const SidebarMenuButton = <T extends ValidComponent = "button">(
  rawProps: SidebarMenuButtonProps<T>
) => {
  const local = merge(
    { isActive: false, variant: "default", size: "default" },
    rawProps
  ) as SidebarMenuButtonProps
  const others = omit(
    rawProps as SidebarMenuButtonProps,
    "isActive",
    "tooltip",
    "as",
    "variant",
    "size",
    "class"
  )
  const { isMobile, state } = useSidebar()
  const Comp = dynamic(() => local.as ?? "button", {
    static: isStatic(rawProps, "as")
  })
  const MenuButton = (menuButtonProps: SidebarMenuButtonProps) => {
    const forwardedProps = omit(menuButtonProps, "class", "as")
    return (
      <Comp
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        data-size={local.size}
        data-active={local.isActive}
        class={cn(
          sidebarMenuButtonVariants({
            variant: local.variant,
            size: local.size
          }),
          menuButtonProps.class,
          local.class
        )}
        {...forwardedProps}
        {...others}
      />
    )
  }
  return (
    <Show fallback={<MenuButton />} when={local.tooltip}>
      <Tooltip>
        <TooltipTrigger render={MenuButton} class="w-full" />
        <TooltipContent
          side="right"
          align="center"
          hidden={state() !== "collapsed" || isMobile()}
        >
          {local.tooltip}
        </TooltipContent>
      </Tooltip>
    </Show>
  )
}

type SidebarMenuActionProps<T extends ValidComponent = "button"> =
  ComponentProps<T> & {
    showOnHover?: boolean
  }

const SidebarMenuAction = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, SidebarMenuActionProps>
) => {
  const local = merge(
    { showOnHover: false },
    rawProps
  ) as SidebarMenuActionProps
  const others = omit(
    rawProps as PolymorphicProps<"button", SidebarMenuActionProps>,
    "class",
    "as",
    "showOnHover"
  )
  const Comp = dynamic(() => rawProps.as ?? "button", {
    static: isStatic(rawProps, "as")
  })
  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      class={cn(
        "cn-sidebar-menu-action flex items-center justify-center outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 md:after:hidden [&>svg]:shrink-0",
        local.showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground md:opacity-0 data-open:opacity-100",
        local.class
      )}
      {...others}
    />
  )
}

const SidebarMenuBadge: Component<ComponentProps<"div">> = (props) => (
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    {...props}
    class={cn(
      "cn-sidebar-menu-badge flex items-center justify-center tabular-nums select-none group-data-[collapsible=icon]:hidden",
      props.class
    )}
  />
)

type SidebarMenuSkeletonProps = ComponentProps<"div"> & {
  showIcon?: boolean
}

const SidebarMenuSkeleton: Component<SidebarMenuSkeletonProps> = (rawProps) => {
  const local = merge({ showIcon: false }, rawProps)
  const others = omit(rawProps, "class", "showIcon")
  const width = createMemo(() => `${Math.floor(Math.random() * 40) + 50}%`)
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      class={cn("cn-sidebar-menu-skeleton flex items-center", local.class)}
      {...others}
    >
      <Show when={local.showIcon}>
        <Skeleton
          class="cn-sidebar-menu-skeleton-icon"
          data-sidebar="menu-skeleton-icon"
        />
      </Show>
      <Skeleton
        class="cn-sidebar-menu-skeleton-text max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width()
        }}
      />
    </div>
  )
}

const SidebarMenuSub: Component<ComponentProps<"ul">> = (props) => (
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    {...props}
    class={cn("cn-sidebar-menu-sub flex min-w-0 flex-col", props.class)}
  />
)

const SidebarMenuSubItem: Component<ComponentProps<"li">> = (props) => (
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    {...props}
    class={cn("group/menu-sub-item relative", props.class)}
  />
)

type SidebarMenuSubButtonProps<T extends ValidComponent = "a"> =
  ComponentProps<T> & {
    size?: "sm" | "md"
    isActive?: boolean
  }

const SidebarMenuSubButton = <T extends ValidComponent = "a">(
  rawProps: PolymorphicProps<T, SidebarMenuSubButtonProps>
) => {
  const local = merge({ size: "md" }, rawProps) as SidebarMenuSubButtonProps
  const others = omit(
    rawProps as PolymorphicProps<"a", SidebarMenuSubButtonProps>,
    "size",
    "isActive",
    "class",
    "as"
  )
  const Comp = dynamic(() => rawProps.as ?? "a", {
    static: isStatic(rawProps, "as")
  })
  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={local.size}
      data-active={local.isActive}
      class={cn(
        "cn-sidebar-menu-sub-button flex min-w-0 -translate-x-px items-center overflow-hidden outline-hidden group-data-[collapsible=icon]:hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0",
        local.class
      )}
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
  useSidebar,
  type SidebarProps
}
