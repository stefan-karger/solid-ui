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
          href: "/docs/components/calendar"
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
          title: "Context Menu",
          href: "/docs/components/context-menu"
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
          href: "/docs/components/empty"
        },
        {
          title: "Field",
          href: "/docs/components/field"
        },
        {
          title: "Hover Card",
          href: "/docs/components/hover-card"
        },
        {
          title: "Input",
          href: "/docs/components/input"
        },
        {
          title: "Input Group",
          href: "/docs/components/input-group"
        },
        {
          title: "Input OTP",
          href: "/docs/components/input-otp"
        },
        {
          title: "Item",
          href: "/docs/components/item"
        },
        {
          title: "Kbd",
          href: "/docs/components/kbd"
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
          href: "/docs/components/native-select"
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
          title: "Skeleton",
          href: "/docs/components/skeleton"
        },
        {
          title: "Slider",
          href: "/docs/components/slider"
        },
        {
          title: "Spinner",
          href: "/docs/components/spinner"
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
          title: "Toggle",
          href: "/docs/components/toggle"
        },
        {
          title: "Toggle Group",
          href: "/docs/components/toggle-group"
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
