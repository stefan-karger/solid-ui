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
          title: "Alert",
          href: "/docs/components/alert"
        },
        {
          title: "Alert Dialog",
          href: "/docs/components/alert-dialog"
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
          title: "Button",
          href: "/docs/components/button"
        },
        {
          title: "Button Group",
          href: "/docs/components/button-group"
        },
        {
          title: "Calendar",
          href: "/docs/components/calendar",
          status: "new"
        },
        {
          title: "Card",
          href: "/docs/components/card"
        },
        {
          title: "Carousel",
          href: "/docs/components/carousel",
          status: "new"
        },
        {
          title: "Chart",
          href: "/docs/components/chart",
          status: "new"
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
          href: "/docs/components/combobox",
          status: "new"
        },
        {
          title: "Command",
          href: "/docs/components/command",
          status: "new"
        },
        {
          title: "Context Menu",
          href: "/docs/components/context-menu"
        },
        {
          title: "Data Table",
          href: "/docs/components/data-table",
          status: "new"
        },
        {
          title: "Date Picker",
          href: "/docs/components/date-picker",
          status: "new"
        },
        {
          title: "Dialog",
          href: "/docs/components/dialog"
        },
        {
          title: "Direction",
          href: "/docs/components/direction",
          status: "new"
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
          href: "/docs/components/field"
        },
        {
          title: "Form",
          href: "/docs/components/form",
          status: "new"
        },
        {
          title: "Hover Card",
          href: "/docs/components/hover-card",
          status: "new"
        },
        {
          title: "Input Group",
          href: "/docs/components/input-group"
        },
        {
          title: "Input OTP",
          href: "/docs/components/input-otp",
          status: "new"
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
          href: "/docs/components/menubar",
          status: "new"
        },
        {
          title: "Native Select",
          href: "/docs/components/native-select",
          status: "new"
        },
        {
          title: "Navigation Menu",
          href: "/docs/components/navigation-menu",
          status: "new"
        },
        {
          title: "Pagination",
          href: "/docs/components/pagination",
          status: "new"
        },
        {
          title: "Popover",
          href: "/docs/components/popover",
          status: "new"
        },
        {
          title: "Progress",
          href: "/docs/components/progress",
          status: "new"
        },
        {
          title: "Radio Group",
          href: "/docs/components/radio-group"
        },
        {
          title: "Resizable",
          href: "/docs/components/resizable",
          status: "new"
        },
        {
          title: "Scroll Area",
          href: "/docs/components/scroll-area",
          status: "new"
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
          title: "Slider",
          href: "/docs/components/slider"
        },
        {
          title: "Sonner",
          href: "/docs/components/sonner",
          status: "new"
        },
        {
          title: "Switch",
          href: "/docs/components/switch"
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs"
        },
        {
          title: "Table",
          href: "/docs/components/table"
        },
        {
          title: "Toggle",
          href: "/docs/components/toggle"
        },
        {
          title: "Toggle Group",
          href: "/docs/components/toggle-group",
          status: "new"
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

  let prev: NavElement | undefined
  let next: NavElement | undefined

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
