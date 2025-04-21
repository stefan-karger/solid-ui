import { A } from "@solidjs/router";
import { For } from "solid-js";

import { Index } from "~/__registry__";
import { BlockDisplay } from "~/components/block-display";
import { MetaTags } from "~/components/meta-tags";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Button } from "~/registry/ui/button";

function getAllBlocks() {
  return Object.values(Index)
    .filter((block) => block.type === "block" && !block.name.startsWith("demo"))
    .map((block) => block.name);
}

export default function Blocks() {
  return (
    <>
      <MetaTags
        description="Beautifully designed. Copy and paste into your apps. Open Source."
        title="Blocks"
      />
      <div class="relative">
        <PageHeader>
          <PageHeaderHeading>Building Blocks for the Web</PageHeaderHeading>
          <PageHeaderDescription>
            Beautifully designed. Copy and paste into your apps. Open Source.
          </PageHeaderDescription>
          <PageHeaderActions>
            <Button as={A} href="#blocks" size="sm">
              Browse Blocks
            </Button>
            <Button
              as={A}
              href="https://github.com/stefan-karger/solid-ui/issues/new"
              rel="noreferrer"
              size="sm"
              target="_blank"
              variant="ghost"
            >
              Request a block
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <div class="container py-6">
          <section class="grid scroll-mt-24 gap-24 lg:gap-48" id="blocks">
            <For each={getAllBlocks()}>
              {(name) => <BlockDisplay name={name} />}
            </For>
          </section>
        </div>
      </div>
    </>
  );
}
