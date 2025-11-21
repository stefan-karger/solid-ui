import { Title } from "@solidjs/meta"
import { A } from "@solidjs/router"

import { Announcement } from "~/components/announcement"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/components/page-header"
import { PageNav } from "~/components/page-nav"
import { Button } from "~/registry/v1/ui/button"

const title = "The Foundation for your Design System"
const description =
  "A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code."

export default function Home() {
  return (
    <div class="flex flex-1 flex-col">
      <Title>{title} - SolidUI</Title>
      <PageHeader>
        <Announcement />
        <PageHeaderHeading class="max-w-4xl">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button as={A} href="/docs/installation" size="sm">
            Get Started
          </Button>
          <Button as={A} href="/docs/components" size="sm" variant="ghost">
            View Components
          </Button>
        </PageActions>
      </PageHeader>
      <PageNav class="hidden md:flex">
        {/*<ExamplesNav class="flex-1 overflow-hidden [&>a:first-child]:text-primary" />
        <ThemeSelector class="mr-4 hidden md:flex" />*/}
      </PageNav>
      <div class="container-wrapper section-soft flex-1 pb-6">
        <div class="container overflow-hidden">
          <section class="-mx-4 w-[160vw] overflow-hidden rounded-lg border border-border/50 md:hidden md:w-[150vw]">
            <img
              alt="Dashboard"
              class="block dark:hidden"
              height={875}
              src="/r/styles/new-york-v4/dashboard-01-light.png"
              width={1400}
            />
            <img
              alt="Dashboard"
              class="hidden dark:block"
              height={875}
              src="/r/styles/new-york-v4/dashboard-01-dark.png"
              width={1400}
            />
          </section>
          <section class="theme-container hidden md:block">{/*<RootComponents />*/}</section>
        </div>
      </div>
    </div>
  )
}
