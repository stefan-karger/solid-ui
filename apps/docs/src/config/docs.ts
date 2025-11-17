type NavElement = {
  title: string
  href: string
  external?: boolean
  status?: "new" | "updated"
}

type NavCategory = {
  title: string
  items: NavElement[]
}

type Config = {
  mainNav: NavElement[]
  sidebarNav: NavCategory[]
}

export const docsConfig: Config = {
  mainNav: [
    {
      title: "Components",
      href: "/docs/components"
    }
  ],
  sidebarNav: [
    {
      title: "Sections",
      items: [
        {
          title: "Components",
          href: "/docs/components"
        }
      ]
    },
    {
      title: "Components",
      items: [
        {
          title: "Accordion",
          href: "/docs/components/accordion"
        },
        {
          title: "Alert Dialog",
          href: "/docs/components/alert-dialog"
        },
        {
          title: "Alert",
          href: "/docs/components/alert"
        },
        {
          title: "Aspect Ratio",
          href: "/docs/components/aspect-ratio"
        },
        {
          title: "Avatar",
          href: "/docs/components/avatar"
        },
        {
          title: "Badge",
          href: "/docs/components/badge"
        },
        {
          title: "Breadcrumb",
          href: "/docs/components/breadcrumb"
        },
        {
          title: "Button Group",
          href: "/docs/components/button-group",
          status: "new"
        },
        {
          title: "Button",
          href: "/docs/components/button"
        },
        {
          title: "Calendar",
          href: "/docs/components/calendar"
        },
        {
          title: "Card",
          href: "/docs/components/card"
        },
        {
          title: "Carousel",
          href: "/docs/components/carousel"
        },
        {
          title: "Chart",
          href: "/docs/components/chart"
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox"
        },
        {
          title: "Collapsible",
          href: "/docs/components/collapsible"
        },
        {
          title: "Combobox",
          href: "/docs/components/combobox"
        },
        {
          title: "Command",
          href: "/docs/components/command"
        },
        {
          title: "Context Menu",
          href: "/docs/components/context-menu"
        },
        {
          title: "Data Table",
          href: "/docs/components/data-table"
        },
        {
          title: "Date Picker",
          href: "/docs/components/date-picker"
        },
        {
          title: "Dialog",
          href: "/docs/components/dialog"
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer"
        },
        {
          title: "Dropdown Menu",
          href: "/docs/components/dropdown-menu"
        },
        {
          title: "Empty",
          href: "/docs/components/empty",
          status: "new"
        },
        {
          title: "Field",
          href: "/docs/components/field",
          status: "new"
        },
        {
          title: "Form",
          href: "/docs/components/form"
        },
        {
          title: "Hover Card",
          href: "/docs/components/hover-card"
        },
        {
          title: "Input Group",
          href: "/docs/components/input-group",
          status: "new"
        },
        {
          title: "Input OTP",
          href: "/docs/components/input-otp"
        },
        {
          title: "Input",
          href: "/docs/components/input"
        },
        {
          title: "Item",
          href: "/docs/components/item",
          status: "new"
        },
        {
          title: "Kbd",
          href: "/docs/components/kbd",
          status: "new"
        },
        {
          title: "Label",
          href: "/docs/components/label"
        },
        {
          title: "Menubar",
          href: "/docs/components/menubar"
        },
        {
          title: "Native Select",
          href: "/docs/components/native-select",
          status: "new"
        },
        {
          title: "Navigation Menu",
          href: "/docs/components/navigation-menu"
        },
        {
          title: "Pagination",
          href: "/docs/components/pagination"
        },
        {
          title: "Popover",
          href: "/docs/components/popover"
        },
        {
          title: "Progress",
          href: "/docs/components/progress"
        },
        {
          title: "Radio Group",
          href: "/docs/components/radio-group"
        },
        {
          title: "Resizable",
          href: "/docs/components/resizable"
        },
        {
          title: "Scroll Area",
          href: "/docs/components/scroll-area"
        },
        {
          title: "Select",
          href: "/docs/components/select"
        },
        {
          title: "Separator",
          href: "/docs/components/separator"
        },
        {
          title: "Sheet",
          href: "/docs/components/sheet"
        },
        {
          title: "Sidebar",
          href: "/docs/components/sidebar"
        },
        {
          title: "Skeleton",
          href: "/docs/components/skeleton"
        },
        {
          title: "Slider",
          href: "/docs/components/slider"
        },
        {
          title: "Sonner",
          href: "/docs/components/sonner"
        },
        {
          title: "Spinner",
          href: "/docs/components/spinner",
          status: "new"
        },
        {
          title: "Switch",
          href: "/docs/components/switch"
        },
        {
          title: "Table",
          href: "/docs/components/table"
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs"
        },
        {
          title: "Textarea",
          href: "/docs/components/textarea"
        },
        {
          title: "Toast",
          href: "/docs/components/toast"
        },
        {
          title: "Toggle Group",
          href: "/docs/components/toggle-group"
        },
        {
          title: "Toggle",
          href: "/docs/components/toggle"
        },
        {
          title: "Tooltip",
          href: "/docs/components/tooltip"
        }
      ]
    }
  ]
}

export const flatConfig = () => [
  ...docsConfig.mainNav,
  ...docsConfig.sidebarNav.flatMap((category) => category.items)
]

export const getPrevAndNext = (curHref: string) => {
  const allElements = flatConfig()
  const curIdx = allElements.findIndex((el) => el.href === curHref)

  let prev: NavElement | null = null
  let next: NavElement | null = null

  if (curIdx === -1) {
    return { prev: null, next: null }
  }

  if (curIdx > 0) {
    prev = allElements[curIdx - 1]
  }

  if (curIdx < allElements.length - 1) {
    next = allElements[curIdx + 1]
  }

  return { prev, next }
}
