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
          title: "Card",
          href: "/docs/components/card"
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox"
        },
        {
          title: "Dropdown Menu",
          href: "/docs/components/dropdown-menu"
        },
        {
          title: "Field",
          href: "/docs/components/field",
          status: "new"
        },
        {
          title: "Input Group",
          href: "/docs/components/input-group"
        },
        {
          title: "Kbd",
          href: "/docs/components/kbd",
          status: "new"
        },
        {
          title: "Popover",
          href: "/docs/components/popover"
        },
        {
          title: "Radio Group",
          href: "/docs/components/radio-group"
        },
        {
          title: "Select",
          href: "/docs/components/select"
        },
        {
          title: "Slider",
          href: "/docs/components/slider"
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
