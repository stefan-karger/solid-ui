import { InboxIcon } from "lucide-solid"

import { Example, ExampleWrapper } from "~/registry/examples/example"
import { Button } from "~/registry/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from "~/registry/ui/item"

type ItemVariant = "default" | "outline" | "muted"
type ItemSize = "default" | "sm" | "xs"

function ArchiveIcon() {
  return <InboxIcon />
}

function AvatarImage(props: { label: string }) {
  return (
    <img
      alt={props.label}
      class="object-cover grayscale"
      height="40"
      src={`https://avatar.vercel.sh/${props.label}`}
      width="40"
    />
  )
}

function ActionButton(props: { size: ItemSize }) {
  return <Button size={props.size === "default" ? undefined : "sm"}>Action</Button>
}

function OutlineActionButton(props: { size: ItemSize }) {
  return (
    <Button size={props.size === "default" ? undefined : "sm"} variant="outline">
      Action
    </Button>
  )
}

function ConfirmActions() {
  return (
    <>
      <Button size="sm" variant="outline">
        Cancel
      </Button>
      <Button size="sm">Confirm</Button>
    </>
  )
}

function BasicVariantSection(props: { title: string; variant: ItemVariant; size?: ItemSize }) {
  const size = () => props.size ?? "default"
  const itemSize = () => (size() === "default" ? undefined : size())

  return (
    <Example title={props.title}>
      <Item size={itemSize()} variant={props.variant}>
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <OutlineActionButton size={size()} />
        </ItemActions>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>This is a description that provides additional context.</ItemDescription>
        </ItemContent>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <OutlineActionButton size={size()} />
        </ItemActions>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemMedia variant="icon">
          <ArchiveIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemMedia variant="icon">
          <ArchiveIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ActionButton size={size()} />
        </ItemActions>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemMedia variant="icon">
          <ArchiveIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>This item includes media, title, and description.</ItemDescription>
        </ItemContent>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemMedia variant="icon">
          <ArchiveIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ActionButton size={size()} />
        </ItemActions>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>Item with multiple action buttons in the actions area.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ConfirmActions />
        </ItemActions>
      </Item>
    </Example>
  )
}

function LinkItemsSection(props: { title: string; variant: ItemVariant }) {
  return (
    <Example title={props.title}>
      <ItemGroup>
        <Item as="a" href="#" variant={props.variant}>
          <ItemContent>
            <ItemTitle>Title Only (Link)</ItemTitle>
          </ItemContent>
        </Item>
        <Item as="a" href="#" variant={props.variant}>
          <ItemContent>
            <ItemTitle>Title + Description (Link)</ItemTitle>
            <ItemDescription>Clickable item with title and description.</ItemDescription>
          </ItemContent>
        </Item>
        <Item as="a" href="#" variant={props.variant}>
          <ItemMedia variant="icon">
            <ArchiveIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Media + Title (Link)</ItemTitle>
          </ItemContent>
        </Item>
        <Item as="a" href="#" variant={props.variant}>
          <ItemMedia variant="icon">
            <ArchiveIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Media + Title + Description (Link)</ItemTitle>
            <ItemDescription>
              Complete link item with media, title, and description.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item as="a" href="#" variant={props.variant}>
          <ItemContent>
            <ItemTitle>With Actions (Link)</ItemTitle>
            <ItemDescription>Link item that also has action buttons.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Share
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </Example>
  )
}

function ItemGroupSection(props: { title: string; variant: ItemVariant }) {
  return (
    <Example title={props.title}>
      <ItemGroup>
        <Item variant={props.variant}>
          {props.variant === "outline" ? (
            <ItemMedia variant="icon">
              <ArchiveIcon />
            </ItemMedia>
          ) : null}
          <ItemContent>
            <ItemTitle>Item 1</ItemTitle>
            <ItemDescription>
              {props.variant === "default"
                ? "First item in the group."
                : props.variant === "outline"
                  ? "First item with icon."
                  : "First item in muted group."}
            </ItemDescription>
          </ItemContent>
          {props.variant === "muted" ? (
            <ItemActions>
              <Button size="sm" variant="outline">
                Action
              </Button>
            </ItemActions>
          ) : null}
        </Item>
        <Item variant={props.variant}>
          {props.variant === "outline" ? (
            <ItemMedia variant="icon">
              <ArchiveIcon />
            </ItemMedia>
          ) : null}
          <ItemContent>
            <ItemTitle>Item 2</ItemTitle>
            <ItemDescription>
              {props.variant === "default"
                ? "Second item in the group."
                : props.variant === "outline"
                  ? "Second item with icon."
                  : "Second item in muted group."}
            </ItemDescription>
          </ItemContent>
          {props.variant === "muted" ? (
            <ItemActions>
              <Button size="sm" variant="outline">
                Action
              </Button>
            </ItemActions>
          ) : null}
        </Item>
        <Item variant={props.variant}>
          {props.variant === "outline" ? (
            <ItemMedia variant="icon">
              <ArchiveIcon />
            </ItemMedia>
          ) : null}
          <ItemContent>
            <ItemTitle>Item 3</ItemTitle>
            <ItemDescription>
              {props.variant === "default"
                ? "Third item in the group."
                : props.variant === "outline"
                  ? "Third item with icon."
                  : "Third item in muted group."}
            </ItemDescription>
          </ItemContent>
          {props.variant === "muted" ? (
            <ItemActions>
              <Button size="sm" variant="outline">
                Action
              </Button>
            </ItemActions>
          ) : null}
        </Item>
      </ItemGroup>
    </Example>
  )
}

function ImageItemsSection(props: {
  title: string
  variant: ItemVariant
  size?: ItemSize
  compact?: boolean
}) {
  const size = () => props.size ?? "default"
  const itemSize = () => (size() === "default" ? undefined : size())

  return (
    <Example title={props.title}>
      <Item size={itemSize()} variant={props.variant}>
        <ItemMedia variant="image">
          <AvatarImage label="Project" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Project Dashboard</ItemTitle>
          {!props.compact ? (
            <ItemDescription>Overview of project settings and configuration.</ItemDescription>
          ) : null}
        </ItemContent>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemMedia variant="image">
          <AvatarImage label="Document" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document</ItemTitle>
          {!props.compact ? (
            <ItemDescription>A document with metadata displayed.</ItemDescription>
          ) : null}
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            View
          </Button>
        </ItemActions>
      </Item>
      <Item size={itemSize()} variant={props.variant}>
        <ItemMedia variant="image">
          <AvatarImage label="File" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>File Attachment</ItemTitle>
          {!props.compact ? (
            <ItemDescription>
              Complete file with image, title, description, and action button.
            </ItemDescription>
          ) : null}
        </ItemContent>
        <ItemActions>
          <Button size="sm">Download</Button>
        </ItemActions>
      </Item>
    </Example>
  )
}

export default function ItemExample() {
  return (
    <ExampleWrapper>
      <BasicVariantSection title="Default" variant="default" />
      <BasicVariantSection title="Outline" variant="outline" />
      <BasicVariantSection title="Muted" variant="muted" />
      <BasicVariantSection size="sm" title="Small" variant="default" />
      <BasicVariantSection size="sm" title="Outline - Small" variant="outline" />
      <BasicVariantSection size="sm" title="Muted - Small" variant="muted" />
      <BasicVariantSection size="xs" title="Extra Small" variant="default" />
      <BasicVariantSection size="xs" title="Outline - Extra Small" variant="outline" />
      <BasicVariantSection size="xs" title="Muted - Extra Small" variant="muted" />
      <LinkItemsSection title="asChild" variant="default" />
      <LinkItemsSection title="Outline - asChild" variant="outline" />
      <LinkItemsSection title="Muted - asChild" variant="muted" />
      <ItemGroupSection title="ItemGroup" variant="default" />
      <ItemGroupSection title="Outline - ItemGroup" variant="outline" />
      <ItemGroupSection title="Muted - ItemGroup" variant="muted" />
      <ItemSeparatorExample />
      <ItemHeaderExamples />
      <ItemFooterExamples />
      <ItemHeaderAndFooterExamples />
      <ImageItemsSection title="Default - ItemMedia image" variant="default" />
      <ImageItemsSection title="Outline - ItemMedia image" variant="outline" />
      <ImageItemsSection size="sm" title="Outline - ItemMedia image - Small" variant="outline" />
      <ImageItemsSection
        compact
        size="xs"
        title="Outline - ItemMedia image - Extra Small"
        variant="outline"
      />
      <ImageItemsSection title="Muted - ItemMedia image" variant="muted" />
    </ExampleWrapper>
  )
}

function ItemSeparatorExample() {
  return (
    <Example title="ItemSeparator">
      <ItemGroup>
        <OutlineMailboxItem title="Inbox" description="View all incoming messages." />
        <ItemSeparator />
        <OutlineMailboxItem title="Sent" description="View all sent messages." />
        <ItemSeparator />
        <OutlineMailboxItem title="Drafts" description="View all draft messages." />
        <ItemSeparator />
        <OutlineMailboxItem title="Archive" description="View archived messages." />
      </ItemGroup>
    </Example>
  )
}

function OutlineMailboxItem(props: { title: string; description: string }) {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <ArchiveIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{props.title}</ItemTitle>
        <ItemDescription>{props.description}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

function ItemHeaderExamples() {
  return (
    <Example title="ItemHeader">
      <Item>
        <ItemHeader>
          <span class="text-sm font-medium">Design System</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Component Library</ItemTitle>
          <ItemDescription>
            A comprehensive collection of reusable UI components for building consistent interfaces.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemHeader>
          <span class="text-sm font-medium">Marketing</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Campaign Analytics</ItemTitle>
          <ItemDescription>
            Track performance metrics and engagement rates across all marketing channels.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemHeader>
          <span class="text-sm font-medium">Engineering</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>API Documentation</ItemTitle>
          <ItemDescription>
            Complete reference guide for all available endpoints and authentication methods.
          </ItemDescription>
        </ItemContent>
      </Item>
    </Example>
  )
}

function ItemFooterExamples() {
  return (
    <Example title="ItemFooter">
      <Item>
        <ItemContent>
          <ItemTitle>Quarterly Report Q4 2024</ItemTitle>
          <ItemDescription>
            Financial overview including revenue, expenses, and growth metrics for the fourth
            quarter.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span class="text-sm text-muted-foreground">Last updated 2 hours ago</span>
        </ItemFooter>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>User Research Findings</ItemTitle>
          <ItemDescription>
            Insights from interviews and surveys conducted with 50+ users across different
            demographics.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span class="text-sm text-muted-foreground">Created by Sarah Chen</span>
        </ItemFooter>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Product Roadmap</ItemTitle>
          <ItemDescription>
            Planned features and improvements scheduled for the next three months.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span class="text-sm text-muted-foreground">12 comments</span>
        </ItemFooter>
      </Item>
    </Example>
  )
}

function ItemHeaderAndFooterExamples() {
  return (
    <Example title="ItemHeader + ItemFooter">
      <Item>
        <ItemHeader>
          <span class="text-sm font-medium">Team Project</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Website Redesign</ItemTitle>
          <ItemDescription>
            Complete overhaul of the company website with modern design principles and improved user
            experience.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span class="text-sm text-muted-foreground">Updated 5 minutes ago</span>
        </ItemFooter>
      </Item>
      <Item variant="outline">
        <ItemHeader>
          <span class="text-sm font-medium">Client Work</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Mobile App Development</ItemTitle>
          <ItemDescription>
            Building a cross-platform mobile application for iOS and Android with React Native.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span class="text-sm text-muted-foreground">Status: In Progress</span>
        </ItemFooter>
      </Item>
      <Item variant="muted">
        <ItemHeader>
          <span class="text-sm font-medium">Documentation</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>API Integration Guide</ItemTitle>
          <ItemDescription>
            Step-by-step instructions for integrating third-party APIs with authentication and error
            handling.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span class="text-sm text-muted-foreground">Category: Technical • 3 attachments</span>
        </ItemFooter>
      </Item>
    </Example>
  )
}
