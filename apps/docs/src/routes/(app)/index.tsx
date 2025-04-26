import { A } from "@solidjs/router"

import { ExamplesNav } from "@/components/examples-nav"
import { IconBrandGithub } from "@/components/icons"
import { Mail } from "@/components/mail"
import {
    PageHeader,
    PageHeaderActions,
    PageHeaderDescription,
    PageHeaderHeading
} from "@/components/page-header"
import { Button } from "@/registry/ui/button"

export default function Home() {
  return (
    <div class="relative">
      <PageHeader>
        <PageHeaderHeading>Build your component library.</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your apps.
        </PageHeaderDescription>
        <p class="text-sm text-[#4d83c4] dark:text-[#93c4e9]">
          This is an unofficial port of{" "}
          <A
            href="https://github.com/shadcn-ui/ui"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </A>{" "}
          and{" "}
          <A
            href="https://github.com/tremorlabs/tremor-raw"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            tremor-raw
          </A>{" "}
          to Solid.
        </p>
        <PageHeaderActions>
          <Button as={A} size="sm" href="/docs/introduction">
            Get Started
          </Button>
          <Button
            as={A}
            variant="ghost"
            size="sm"
            href="https://github.com/stefan-karger/solid-ui"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandGithub /> GitHub
          </Button>
        </PageHeaderActions>
      </PageHeader>
      <section class="container py-6">
        <ExamplesNav />
        <div class="hidden md:block [&>div]:p-0">
          <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <Mail />
          </div>
        </div>
      </section>
    </div>
  )
}
