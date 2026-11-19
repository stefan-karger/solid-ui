import { isServer } from "@solidjs/web"
import { Errored, lazy, Loading, untrack, type Component } from "solid-js"

import { DirectionProvider, type Direction } from "~/registry/ui/direction"

type PreviewModule = {
  default: Component
}

// Vite updates this catalog when registry preview files are added or removed.
const previewLoaders = import.meta.glob<PreviewModule>([
  "/src/registry/examples/**/*.{tsx,jsx}",
  "/src/registry/components/**/*.{tsx,jsx}",
  "/src/registry/blocks/**/*.{tsx,jsx}"
])

const componentCache = new Map<string, Component>()

function getPreview(moduleId: string) {
  const loader = previewLoaders[moduleId]
  if (!loader) throw new Error(`[registry-preview] No preview module for ${moduleId}`)

  let Preview = componentCache.get(moduleId)
  if (!Preview) {
    Preview = lazy(loader)
    componentCache.set(moduleId, Preview)
  }
  return Preview
}

export type RegistryPreviewProps = {
  moduleId: string
  direction?: Direction
  locale?: string
}

export default function RegistryPreview(props: RegistryPreviewProps) {
  // An Astro island selects its preview module once when it mounts.
  const Preview = untrack(() => getPreview(props.moduleId))
  const content = (
    <Loading fallback={<p role="status">Loading component preview…</p>}>
      <DirectionProvider
        class="grid w-full min-w-0 justify-items-center in-data-[align=end]:justify-items-end in-data-[align=start]:justify-items-start"
        direction={props.direction ?? "ltr"}
        locale={props.locale ?? (props.direction === "rtl" ? "ar" : "en-US")}
      >
        <Preview />
      </DirectionProvider>
    </Loading>
  )

  return (
    <Errored
      fallback={(error) => {
        if (isServer) throw error()
        console.error("[registry-preview] Could not load the component preview", error())
        return <p role="alert">The component preview could not be loaded.</p>
      }}
    >
      {content}
    </Errored>
  )
}
