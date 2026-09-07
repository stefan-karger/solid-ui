import { createComponent, hydrate, render } from "@solidjs/web"
import { Loading, createStore, reconcile } from "solid-js"

const alreadyInitializedElements = new WeakMap<Element, any>()

export default (element: HTMLElement) =>
  (Component: any, props: any, slotted: any, { client }: { client: string }) => {
    if (!element.hasAttribute("ssr")) return
    const isHydrate = client !== "only"

    let slot: HTMLElement | null
    const slotsByName: Record<string, any> = {}
    if (Object.keys(slotted).length > 0) {
      if (client !== "only") {
        const iterator = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, (node) => {
          if (node === element) return NodeFilter.FILTER_SKIP
          if (node.nodeName === "ASTRO-SLOT") return NodeFilter.FILTER_ACCEPT
          if (node.nodeName === "ASTRO-ISLAND") return NodeFilter.FILTER_REJECT
          return NodeFilter.FILTER_SKIP
        })
        while ((slot = iterator.nextNode() as HTMLElement | null)) {
          slotsByName[slot.getAttribute("name") || "default"] = slot
        }
      }
      for (const [key, value] of Object.entries(slotted)) {
        if (slotsByName[key]) continue
        slotsByName[key] = document.createElement("astro-slot")
        if (key !== "default") slotsByName[key].setAttribute("name", key)
        slotsByName[key].innerHTML = value
      }
    }

    const { default: children, ...slots } = slotsByName
    const renderId = element.dataset.solidRenderId
    if (alreadyInitializedElements.has(element)) {
      alreadyInitializedElements.get(element)!(
        reconcile(
          {
            ...props,
            ...slots,
            children
          },
          () => undefined
        )
      )
    } else {
      const [store, setStore] = createStore({
        ...props,
        ...slots,
        children
      })
      alreadyInitializedElements.set(element, setStore)

      const fn = () => {
        const inner = () => createComponent(Component, store)

        if (isHydrate) {
          return createComponent(Loading, {
            get children() {
              return inner()
            }
          })
        }
        return inner()
      }

      let dispose: () => void
      if (isHydrate) {
        dispose = hydrate(fn, element, renderId === undefined ? {} : { renderId })
      } else {
        element.innerHTML = ""
        dispose = render(fn, element)
      }
      element.addEventListener("astro:unmount", () => dispose(), { once: true })
    }
  }
