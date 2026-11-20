import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/registry/ui/breadcrumb"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardHeader } from "~/registry/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from "~/registry/ui/item"

import { ShowcaseIcon } from "./showcase-icon"

export function Payments() {
  return (
    <Card>
      <CardHeader class="flex flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={(part) => (
                    <Button {...part} size="icon-sm" variant="ghost" aria-label="Account options" />
                  )}
                >
                  <ShowcaseIcon name="MoreHorizontalCircle01Icon" />
                  <span class="sr-only">Account options</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Statements</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <div role="listitem" class="w-full">
            <Item variant="muted" as="a" href="#">
              <ItemMedia variant="icon">
                <ShowcaseIcon name="Settings01Icon" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Change transfer limit</ItemTitle>
                <ItemDescription>Adjust how much you can send from your balance.</ItemDescription>
              </ItemContent>
              <ShowcaseIcon name="ArrowRight01Icon" class="size-4 shrink-0 text-muted-foreground" />
            </Item>
          </div>
          <div role="listitem" class="w-full">
            <Item variant="muted" as="a" href="#">
              <ItemMedia variant="icon">
                <ShowcaseIcon name="Calendar03Icon" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Scheduled transfers</ItemTitle>
                <ItemDescription>Set up a transfer to send at a later date.</ItemDescription>
              </ItemContent>
              <ShowcaseIcon name="ArrowRight01Icon" class="size-4 shrink-0 text-muted-foreground" />
            </Item>
          </div>
          <div role="listitem" class="w-full">
            <Item variant="muted" as="a" href="#">
              <ItemMedia variant="icon">
                <ShowcaseIcon name="RefreshIcon" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Recurring card payments</ItemTitle>
                <ItemDescription>Manage your repeated card transactions.</ItemDescription>
              </ItemContent>
              <ShowcaseIcon name="ArrowRight01Icon" class="size-4 shrink-0 text-muted-foreground" />
            </Item>
          </div>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
