type NavElement = {
  title: string;
  href: string;
  external?: boolean;
  status?: "new" | "updated";
};

type NavCategory = {
  title: string;
  items: NavElement[];
};

type Config = {
  mainNav: NavElement[];
  sidebarNav: NavCategory[];
};

export const docsConfig: Config = {
  mainNav: [
    {
      href: "/docs/introduction",
      title: "Docs",
    },
    {
      href: "/docs/components/accordion",
      title: "Components",
    },
    {
      href: "/examples/cards",
      title: "Examples",
    },
    {
      href: "/blocks",
      title: "Blocks",
    },
  ],
  sidebarNav: [
    {
      items: [
        {
          href: "/docs/introduction",
          title: "Introduction",
        },
        {
          href: "/docs/installation/overview",
          title: "Installation",
        },
        {
          href: "/docs/dark-mode/overview",
          title: "Dark Mode",
        },
        {
          href: "/docs/cli",
          title: "CLI",
        },
        {
          href: "/docs/figma",
          title: "Figma",
        },
        {
          href: "/docs/about",
          title: "About",
        },
      ],
      title: "Getting Started",
    },
    {
      items: [
        {
          href: "/docs/installation/solid-start",
          title: "SolidStart",
        },
        {
          href: "/docs/installation/vite",
          title: "Vite",
        },
        {
          href: "/docs/installation/astro",
          title: "Astro",
        },
        {
          href: "/docs/installation/tauri",
          title: "Tauri",
        },
        {
          href: "/docs/installation/manual",
          title: "Manual",
        },
      ],
      title: "Installation",
    },
    {
      items: [
        {
          href: "/docs/components/bar-list",
          title: "Bar List",
        },
        {
          href: "/docs/components/charts",
          title: "Charts",
        },
        {
          href: "/docs/components/delta-bar",
          title: "Delta Bar",
        },
        {
          href: "/docs/components/progress",
          title: "Progress",
        },
        {
          href: "/docs/components/progress-circle",
          title: "Progress Circle",
        },
      ],
      title: "Visualizations",
    },
    {
      items: [
        {
          href: "/docs/components/accordion",
          title: "Accordion",
        },
        {
          href: "/docs/components/alert",
          title: "Alert",
        },
        {
          href: "/docs/components/alert-dialog",
          title: "Alert Dialog",
        },
        {
          href: "/docs/components/aspect-ratio",
          title: "Aspect Ratio",
        },
        {
          href: "/docs/components/avatar",
          title: "Avatar",
        },
        {
          href: "/docs/components/badge",
          title: "Badge",
        },
        {
          href: "/docs/components/badge-delta",
          title: "Badge Delta",
        },
        {
          href: "/docs/components/breadcrumb",
          title: "Breadcrumb",
        },
        {
          href: "/docs/components/button",
          title: "Button",
        },
        {
          href: "/docs/components/callout",
          title: "Callout",
        },
        {
          href: "/docs/components/card",
          title: "Card",
        },
        {
          href: "/docs/components/carousel",
          title: "Carousel",
        },
        {
          href: "/docs/components/checkbox",
          title: "Checkbox",
        },
        {
          href: "/docs/components/collapsible",
          title: "Collapsible",
        },
        {
          href: "/docs/components/combobox",
          title: "Combobox",
        },
        {
          href: "/docs/components/command",
          title: "Command",
        },
        {
          href: "/docs/components/context-menu",
          title: "Context Menu",
        },
        {
          href: "/docs/components/data-table",
          status: "new",
          title: "Data Table",
        },
        {
          href: "/docs/components/date-picker",
          status: "new",
          title: "Date Picker",
        },
        {
          href: "/docs/components/dialog",
          title: "Dialog",
        },
        {
          href: "/docs/components/drawer",
          title: "Drawer",
        },
        {
          href: "/docs/components/dropdown-menu",
          title: "Dropdown Menu",
        },
        {
          href: "/docs/components/hover-card",
          title: "Hover Card",
        },
        {
          href: "/docs/components/label",
          title: "Label",
        },
        {
          href: "/docs/components/menubar",
          title: "Menubar",
        },
        {
          href: "/docs/components/navigation-menu",
          title: "Navigation Menu",
        },
        {
          href: "/docs/components/number-field",
          title: "Number Field",
        },
        {
          href: "/docs/components/otp-field",
          title: "OTP Field",
        },
        {
          href: "/docs/components/pagination",
          title: "Pagination",
        },
        {
          href: "/docs/components/popover",
          title: "Popover",
        },
        {
          href: "/docs/components/radio-group",
          title: "Radio Group",
        },
        {
          href: "/docs/components/resizable",
          title: "Resizable",
        },
        {
          href: "/docs/components/select",
          title: "Select",
        },
        {
          href: "/docs/components/separator",
          title: "Separator",
        },
        {
          href: "/docs/components/sheet",
          title: "Sheet",
        },
        {
          href: "/docs/components/sidebar",
          status: "new",
          title: "Sidebar",
        },
        {
          href: "/docs/components/skeleton",
          title: "Skeleton",
        },
        {
          href: "/docs/components/slider",
          title: "Slider",
        },
        {
          href: "/docs/components/sonner",
          title: "Sonner",
        },
        {
          href: "/docs/components/switch",
          title: "Switch",
        },
        {
          href: "/docs/components/table",
          title: "Table",
        },
        {
          href: "/docs/components/tabs",
          title: "Tabs",
        },
        {
          href: "/docs/components/text-field",
          title: "Text Field",
        },
        {
          href: "/docs/components/timeline",
          title: "Timeline",
        },
        {
          href: "/docs/components/toast",
          title: "Toast",
        },
        {
          href: "/docs/components/toggle",
          title: "Toggle",
        },
        {
          href: "/docs/components/toggle-group",
          title: "Toggle Group",
        },
        {
          href: "/docs/components/tooltip",
          title: "Tooltip",
        },
      ],
      title: "UI",
    },
    {
      items: [
        {
          href: "/docs/components/flex",
          title: "Flex",
        },
        {
          href: "/docs/components/grid",
          title: "Grid",
        },
      ],
      title: "Layout",
    },
  ],
};
