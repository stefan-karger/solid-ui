import { A, type RouteProps } from "@solidjs/router";

import { ExamplesNav } from "~/components/examples-nav";
import { MetaTags } from "~/components/meta-tags";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Button } from "~/registry/ui/button";

export default function ExamplesLayout(props: RouteProps<string>) {
  return (
    <>
      <MetaTags
        description="Dashboard, Mail, Authentication. Some examples built using the components. Use this as a guide to build your own."
        title="Examples"
      />
      <div class="relative">
        <PageHeader>
          <PageHeaderHeading>Check out some examples</PageHeaderHeading>
          <PageHeaderDescription>
            Dashboard, mail, authentication. Some examples built using the
            components. Use this as a guide to build your own.
          </PageHeaderDescription>
          <PageHeaderActions>
            <Button as={A} href="/docs/introduction" size="sm">
              Get Started
            </Button>
            <Button
              as={A}
              href="/docs/components/accordion"
              size="sm"
              variant="ghost"
            >
              Components
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <section class="container py-6">
          <ExamplesNav />
          <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            {props.children}
          </div>
        </section>
      </div>
    </>
  );
}
