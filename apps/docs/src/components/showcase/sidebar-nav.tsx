import type { JSX } from "@solidjs/web"

import { cn } from "~/lib/utils"
import { Card } from "~/registry/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "~/registry/ui/sidebar"

import { ShowcaseIcon } from "./showcase-icon"

function SidebarSection(props: { label: string; children: JSX.Element; class?: string }) {
  return (
    <Card class={cn("w-full overflow-hidden rounded-3xl py-0", props.class)}>
      <SidebarProvider class="min-h-0">
        <Sidebar collapsible="none" class="w-full bg-transparent">
          <SidebarContent class="gap-0 overflow-hidden">
            <SidebarGroup>
              <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu class="gap-1">{props.children}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </Card>
  )
}

export function SidebarNav() {
  return (
    <div class="grid w-full grid-cols-2 gap-4 xl:gap-6">
      <SidebarSection label="Overview" class="xl:col-start-1 xl:row-start-2">
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <ShowcaseIcon name="Analytics01Icon" />
            Analytics
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="ArrowDataTransferHorizontalIcon" />
            Transactions
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="AnalyticsUpIcon" />
            Investments
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="BankIcon" />
            Accounts
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="PieChartIcon" />
            Spending
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection label="Planning" class="xl:col-start-1 xl:row-start-1">
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="File02Icon" />
            Documents
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="Wallet01Icon" />
            Budget
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="ChartBarLineIcon" />
            Reports
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="Target02Icon" />
            Goals
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="Calendar03Icon" />
            Calendar
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection label="Support" class="flex xl:col-start-2 xl:row-start-1">
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="HelpCircleIcon" />
            Help Center
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="BookOpen02Icon" />
            Docs
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="Message01Icon" />
            Contact Us
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="ActivityIcon" />
            Status
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="Globe02Icon" />
            Community
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection label="Account" class="flex xl:col-start-2 xl:row-start-2">
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="UserIcon" />
            Profile
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <ShowcaseIcon name="CreditCardIcon" />
            Billing
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="Notification03Icon" />
            Notifications
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="ShieldIcon" />
            Security
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShowcaseIcon name="PaintBoardIcon" />
            Appearance
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>
    </div>
  )
}
