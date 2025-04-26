import { A } from "@solidjs/router"
import { For } from "solid-js"

import { Index } from "@/__registry__"
import { BlockDisplay } from "@/components/block-display"
import { MetaTags } from "@/components/meta-tags"
import {
    PageHeader,
    PageHeaderActions,
    PageHeaderDescription,
    PageHeaderHeading
} from "@/components/page-header"
import { Button } from "@/registry/ui/button"

function getAllBlocks() {
  return Object.values(Index)
    .filter((block) => block.type === "block" && !block.name.startsWith("demo"))
    .map((block) => block.name)
}

export default function Blocks() {
  return (
    <>
      <MetaTags
        title="Blocks"
        description="Beautifully designed. Copy and paste into your apps. Open Source."
      />
      <div class="relative">
        <PageHeader>
          <PageHeaderHeading>Building Blocks for the Web</PageHeaderHeading>
          <PageHeaderDescription>
            Beautifully designed. Copy and paste into your apps. Open Source.
          </PageHeaderDescription>
          <PageHeaderActions>
            <Button as={A} size="sm" href="#blocks">
              Browse Blocks
            </Button>
            <Button
              as={A}
              variant="ghost"
              size="sm"
              href="https://github.com/stefan-karger/solid-ui/issues/new"
              target="_blank"
              rel="noreferrer"
            >
              Request a block
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <div class="container py-6">
          <section id="blocks" class="grid scroll-mt-24 gap-24 lg:gap-48">
            <For each={getAllBlocks()}>{(name) => <BlockDisplay name={name} />}</For>
          </section>
        </div>
      </div>
    </>
  )
}
