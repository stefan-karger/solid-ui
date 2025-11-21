import { Show } from "solid-js"
import { Title } from "@solidjs/meta"
import type { RouteSectionProps } from "@solidjs/router"
import { useMatch } from "@solidjs/router"

import { useThemeListener } from "@kobalte/solidbase/client"

import { DocsLayout } from "~/components/docs-layout"
import { SiteHeader } from "~/components/site-header"

export default function (props: RouteSectionProps) {
  useThemeListener()

  const isBlock = useMatch(() => "/blocks/*")
  const isDocsPage = useMatch(() => "/docs/*")
  const isView = useMatch(() => "/view/*")

  return (
    <>
      <Title>SolidUI</Title>
      <Show fallback={props.children} when={!isBlock() && !isView()}>
        <SiteHeader />
        <main class="expressive-code-overrides flex flex-1 flex-col">
          <Show fallback={props.children} when={isDocsPage()}>
            <DocsLayout>{props.children}</DocsLayout>
          </Show>
        </main>
      </Show>
    </>
  )
}
