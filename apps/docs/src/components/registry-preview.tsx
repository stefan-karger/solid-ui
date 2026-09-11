import { Errored, isServer, Loading } from "@solidjs/web"
import { lazy, type Component } from "solid-js"

import { DirectionProvider, type Direction } from "~/registry/ui/direction"

type PreviewModule = {
  default: Component<Record<string, never>>
}

const previewLoaders = import.meta.glob<PreviewModule>([
  "/src/registry/examples/**/*.{tsx,jsx}",
  "/src/registry/components/**/*.{tsx,jsx}",
  "/src/registry/blocks/**/*.{tsx,jsx}"
])

const componentCache = new Map<string, Component<Record<string, never>>>()

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
  const Preview = getPreview(props.moduleId)
  const content = (
    <Loading fallback={<p role="status">Loading component preview…</p>}>
      <DirectionProvider
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
        return <p role="alert">The component preview could not be loaded.</p>
      }}
    >
      {content}
    </Errored>
  )
}
