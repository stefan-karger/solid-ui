import { Title } from "@solidjs/meta"
import { A, type RouteSectionProps } from "@solidjs/router"

import { Announcement } from "~/components/announcement"
import { BlocksNav } from "~/components/blocks-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/components/page-header"
import { PageNav } from "~/components/page-nav"
import { SiteHeader } from "~/components/site-header"
import { Button } from "~/registry/v1/ui/button"

const title = "Building Blocks for the Web"
const description =
  "Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever."

export default function BlocksLayout(props: RouteSectionProps) {
  return (
    <>
      <Title>{title} - SolidUI</Title>
      <SiteHeader />
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button as="a" href="#blocks" size="sm">
            Browse Blocks
          </Button>
          <Button as={A} href="/docs/blocks" size="sm" variant="ghost">
            Add a block
          </Button>
        </PageActions>
      </PageHeader>
      <PageNav id="blocks">
        <BlocksNav />
        <Button
          as={A}
          class="mr-7 hidden shadow-none lg:flex"
          href="/blocks/sidebar"
          size="sm"
          variant="secondary"
        >
          Browse all blocks
        </Button>
      </PageNav>
      <div class="container-wrapper section-soft flex-1 md:py-12">
        <div class="container">{props.children}</div>
      </div>
    </>
  )
}
