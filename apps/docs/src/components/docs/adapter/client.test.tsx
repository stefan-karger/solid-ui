import bootstrap from "@astrojs/solid-js/client.js"
import type { JSX } from "@solidjs/web"
import { createSignal, onCleanup } from "solid-js"
import { afterEach, describe, expect, it, vi } from "vitest"

const flush = () => new Promise((resolve) => setTimeout(resolve, 0))
afterEach(async () => {
  for (const element of document.querySelectorAll("astro-island"))
    element.dispatchEvent(new Event("astro:unmount"))
  await flush()
  document.body.innerHTML = ""
})

function island() {
  const element = document.createElement("astro-island")
  element.setAttribute("ssr", "")
  document.body.append(element)
  return element
}

describe("Astro client contract", () => {
  it("ignores islands that have already completed hydration", async () => {
    const element = island()
    element.removeAttribute("ssr")
    const component = vi.fn(() => <p>unexpected</p>)
    await bootstrap(element)(component, {}, {}, { client: "only" })
    expect(component).not.toHaveBeenCalled()
  })

  it("replaces fallback content and updates props without remounting", async () => {
    const element = island()
    element.innerHTML = "<p>Fallback</p>"
    const mounts = vi.fn()
    const Component = (props: { label?: string }) => {
      mounts()
      return <p>{props.label ?? "removed"}</p>
    }
    const mount = bootstrap(element)
    await mount(Component, { label: "First" }, {}, { client: "only" })
    await flush()
    expect(element.textContent).toBe("First")
    await mount(Component, { label: "Second" }, {}, { client: "only" })
    await flush()
    expect(element.textContent).toBe("Second")
    await mount(Component, {}, {}, { client: "only" })
    await flush()
    expect(element.textContent).toBe("removed")
    expect(mounts).toHaveBeenCalledTimes(1)
    element.dispatchEvent(new Event("astro:unmount"))
  })

  it.each(["named-slot", "named_slot"])(
    "normalizes %s for client-only islands",
    async (slotName) => {
      const element = island()
      const Component = (props: { children?: JSX.Element; namedSlot?: JSX.Element }) => (
        <section>
          {props.children}
          <aside>{props.namedSlot}</aside>
        </section>
      )
      await bootstrap(element)(
        Component,
        {},
        { default: "<b>Default</b>", [slotName]: "<i>Named</i>" },
        { client: "only" }
      )
      await flush()
      expect(element.querySelector("aside")?.textContent).toBe("Named")
      expect(element.querySelector("b")?.textContent).toBe("Default")
      element.dispatchEvent(new Event("astro:unmount"))
    }
  )

  it("skips an island that unmounts before its queued startup", async () => {
    const element = island()
    const Component = vi.fn(() => <p>Should not mount</p>)
    const ready = bootstrap(element)(Component, {}, {}, { client: "only" })
    element.dispatchEvent(new Event("astro:unmount"))
    await ready
    expect(Component).not.toHaveBeenCalled()
  })

  it("cleans up an island exactly once", async () => {
    const element = island()
    const cleanup = vi.fn()
    const Component = () => {
      const [count, setCount] = createSignal(0)
      onCleanup(cleanup)
      return <button onClick={() => setCount(count() + 1)}>count: {count()}</button>
    }
    const mount = bootstrap(element)
    await mount(Component, {}, {}, { client: "only" })
    await flush()
    element.querySelector("button")!.click()
    await flush()
    expect(element.textContent).toBe("count: 1")
    element.dispatchEvent(new Event("astro:unmount"))
    element.dispatchEvent(new Event("astro:unmount"))
    expect(cleanup).toHaveBeenCalledTimes(1)
  })
})
