import { A } from "@solidjs/router";

import { ExamplesNav } from "~/components/examples-nav";
import { IconBrandGithub } from "~/components/icons";
import { Mail } from "~/components/mail";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Button } from "~/registry/ui/button";

export default function Home() {
  return (
    <div class="relative">
      <PageHeader>
        <PageHeaderHeading>Build your component library.</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps.
        </PageHeaderDescription>
        <p class="text-[#4d83c4] text-sm dark:text-[#93c4e9]">
          This is an unofficial port of{" "}
          <A
            class="font-medium underline underline-offset-4"
            href="https://github.com/shadcn-ui/ui"
            rel="noreferrer"
            target="_blank"
          >
            shadcn/ui
          </A>{" "}
          and{" "}
          <A
            class="font-medium underline underline-offset-4"
            href="https://github.com/tremorlabs/tremor-raw"
            rel="noreferrer"
            target="_blank"
          >
            tremor-raw
          </A>{" "}
          to Solid.
        </p>
        <PageHeaderActions>
          <Button as={A} href="/docs/introduction" size="sm">
            Get Started
          </Button>
          <Button
            as={A}
            href="https://github.com/stefan-karger/solid-ui"
            rel="noreferrer"
            size="sm"
            target="_blank"
            variant="ghost"
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
  );
}
