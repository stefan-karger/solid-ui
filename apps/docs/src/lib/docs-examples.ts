import type { Component } from "solid-js"
import { lazy } from "solid-js"

type ExampleModule = { default: Component }
type ExampleLoader = () => Promise<ExampleModule>

const modules = import.meta.glob<ExampleModule>("../registry/examples/*.tsx")
const cache = new Map<string, Component>()

export function getDocsExample(name: string) {
  const cached = cache.get(name)
  if (cached) return cached

  const loader = modules[`../registry/examples/${name}.tsx`] as ExampleLoader | undefined
  if (!loader) return undefined

  const component = lazy(loader)
  cache.set(name, component)
  return component
}
