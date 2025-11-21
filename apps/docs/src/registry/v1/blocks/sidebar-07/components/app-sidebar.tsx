import type { ComponentProps } from "solid-js"

import {
  IconAudioWaveform,
  IconBookOpen,
  IconBot,
  IconCommand,
  IconFrame,
  IconGalleryVerticalEnd,
  IconMap,
  IconPieChart,
  IconSettings,
  IconSquareTerminal
} from "~/components/icons"
import { NavMain } from "~/registry/v1/blocks/sidebar-07/components/nav-main"
import { NavProjects } from "~/registry/v1/blocks/sidebar-07/components/nav-projects"
import { NavUser } from "~/registry/v1/blocks/sidebar-07/components/nav-user"
import { TeamSwitcher } from "~/registry/v1/blocks/sidebar-07/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "~/registry/v1/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  teams: [
    {
      name: "Acme Inc",
      logo: IconGalleryVerticalEnd,
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: IconAudioWaveform,
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: IconCommand,
      plan: "Free"
    }
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: IconSquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#"
        },
        {
          title: "Starred",
          url: "#"
        },
        {
          title: "Settings",
          url: "#"
        }
      ]
    },
    {
      title: "Models",
      url: "#",
      icon: IconBot,
      items: [
        {
          title: "Genesis",
          url: "#"
        },
        {
          title: "Explorer",
          url: "#"
        },
        {
          title: "Quantum",
          url: "#"
        }
      ]
    },
    {
      title: "Documentation",
      url: "#",
      icon: IconBookOpen,
      items: [
        {
          title: "Introduction",
          url: "#"
        },
        {
          title: "Get Started",
          url: "#"
        },
        {
          title: "Tutorials",
          url: "#"
        },
        {
          title: "Changelog",
          url: "#"
        }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
      items: [
        {
          title: "General",
          url: "#"
        },
        {
          title: "Team",
          url: "#"
        },
        {
          title: "Billing",
          url: "#"
        },
        {
          title: "Limits",
          url: "#"
        }
      ]
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: IconFrame
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: IconPieChart
    },
    {
      name: "Travel",
      url: "#",
      icon: IconMap
    }
  ]
}

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
