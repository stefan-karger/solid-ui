import type { ComponentProps, JSX } from "solid-js"

import { IconChevronRight } from "~/components/icons"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/registry/v1/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "~/registry/v1/ui/sidebar"

export function NavMain({
  items
}: {
  items: {
    title: string
    url: string
    icon?: (props: ComponentProps<"svg">) => JSX.Element
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible as={SidebarMenuItem} class="group/collapsible" defaultOpen={item.isActive}>
            <SidebarMenuButton as={CollapsibleTrigger} tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <IconChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>

            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton as="a" href={subItem.url}>
                      <span>{subItem.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
