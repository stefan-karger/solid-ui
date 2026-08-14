import { Show } from "solid-js"
import { Title } from "@solidjs/meta"
import type { RouteSectionProps } from "@solidjs/router"
import { useMatch } from "@solidjs/router"

import { useThemeListener } from "@kobalte/solidbase/client"

import { Toaster } from "~/registry/ui/toast"
import { DesignSystemProvider } from "~/components/design-system-provider"
import { DocsLayout } from "~/components/docs-layout"
import { SiteHeader } from "~/components/site-header"
import { LocksProvider } from "~/hooks/use-locks"
import { ColorModeProvider } from "~/hooks/use-color-mode"

export default function (props: RouteSectionProps) {
  useThemeListener()

  const isBlock = useMatch(() => "/blocks/*")
  const isDocsPage = useMatch(() => "/docs/*")

  return (
    <DesignSystemProvider>
      <LocksProvider>
        <Title>SolidUI</Title>
        <Show fallback={props.children} when={!isBlock()}>
          <SiteHeader />
          <ColorModeProvider initialColorMode="light">
            <Toaster />
            <main class="expressive-code-overrides flex flex-1 flex-col">
              <Show fallback={props.children} when={isDocsPage()}>
                <DocsLayout>{props.children}</DocsLayout>
              </Show>
            </main>
          </ColorModeProvider>
        </Show>
      </LocksProvider>
    </DesignSystemProvider>
  )
}
