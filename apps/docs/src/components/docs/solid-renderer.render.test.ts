import solidRenderer from "@astrojs/solid-js/server.js"
import { ssr, createComponent } from "@solidjs/web"
import { Errored, lazy } from "solid-js"
import { describe, expect, it } from "vitest"

describe("Solid server renderer compatibility", () => {
  const context = () =>
    ({
      result: {
        componentMetadata: new Map(),
        resolve: async (specifier: string) => specifier
      }
    }) as ThisParameterType<typeof solidRenderer.renderToStaticMarkup>

  it("uses unique hydration IDs per request and resets them for a new request", async () => {
    const request = context()
    const render = (
      ctx: ReturnType<typeof context>,
      hydrate: "load" = "load"
    ) =>
      solidRenderer.renderToStaticMarkup.call(
        ctx,
        () => ssr("<p>Island</p>"),
        {},
        {},
        { hydrate, astroStaticSlot: true, displayName: "RendererFixture" }
      )
    expect((await render(request)).attrs).toEqual({
      "data-solid-render-id": "s0"
    })
    expect((await render(request)).attrs).toEqual({
      "data-solid-render-id": "s1"
    })
    expect((await render(context())).attrs).toEqual({
      "data-solid-render-id": "s0"
    })
  })

  it("renders default and normalized named slots without changing serialized props", async () => {
    const props = Object.freeze({ label: "untouched" })
    const slots = Object.freeze({
      default: "<b>Default</b>",
      "named-slot": "<i>Named</i>"
    })
    const Component = (value: {
      children: ReturnType<typeof ssr>
      namedSlot: ReturnType<typeof ssr>
    }) =>
      ssr(
        ["<section>", "<aside>", "</aside></section>"],
        value.children,
        value.namedSlot
      )
    const rendered = await solidRenderer.renderToStaticMarkup.call(
      context(),
      Component,
      props,
      slots,
      { hydrate: "load", astroStaticSlot: true, displayName: "RendererFixture" }
    )
    expect(rendered.html).toContain("<astro-slot><b>Default</b></astro-slot>")
    expect(rendered.html).toContain(
      '<astro-slot name="namedSlot"><i>Named</i></astro-slot>'
    )
    expect(props).toEqual({ label: "untouched" })
  })

  it("escapes named slot attributes and renders static slots without scripts", async () => {
    const name = 'quote"<&'
    const Component = (props: Record<string, ReturnType<typeof ssr>>) =>
      props[name]
    const rendered = await solidRenderer.renderToStaticMarkup.call(
      context(),
      Component,
      {},
      { [name]: "<b>Safe</b>" },
      { astroStaticSlot: true, displayName: "RendererFixture" }
    )
    expect(rendered.html).toContain('name="quote&quot;&lt;&amp;"')
    expect(rendered.html).toContain("astro-static-slot")
    expect(rendered.html).not.toContain("<script")
  })

  it("waits for lazy components during SSR", async () => {
    const Lazy = lazy(async () => ({
      default: () => ssr("<p>Async complete</p>")
    }))
    const rendered = await solidRenderer.renderToStaticMarkup.call(
      context(),
      () => createComponent(Lazy, {}),
      {},
      {},
      { hydrate: "load", astroStaticSlot: true, displayName: "RendererFixture" }
    )
    expect(rendered.html).toContain("Async complete")
  })

  it("does not claim non-components, Qwik, or either Svelte server signature", async () => {
    const request = context() as ThisParameterType<typeof solidRenderer.check>
    function QwikComponent() {
      return "Qwik"
    }
    function LegacySvelte($$payload: unknown) {
      return $$payload
    }
    function Svelte($$renderer: unknown) {
      return $$renderer
    }
    for (const candidate of [null, {}, QwikComponent, LegacySvelte, Svelte]) {
      await expect(
        solidRenderer.check.call(request, candidate, {}, {})
      ).resolves.toBe(false)
    }
    await expect(
      solidRenderer.check.call(request, () => ssr("<p>Solid</p>"), {}, {})
    ).resolves.toBe(true)
  })

  it("accepts Proxy components without reading their toString property and caches probes", async () => {
    let renders = 0
    const Component = new Proxy(
      () => {
        renders++
        return ssr("<p>Proxy</p>")
      },
      {
        get(target, key, receiver) {
          if (key === "toString") throw new Error("Unexpected reflective read")
          return Reflect.get(target, key, receiver)
        }
      }
    )
    const request = context() as ThisParameterType<typeof solidRenderer.check>
    await expect(
      solidRenderer.check.call(request, Component, {}, {})
    ).resolves.toBe(true)
    await expect(
      solidRenderer.check.call(request, Component, {}, {})
    ).resolves.toBe(true)
    expect(renders).toBe(1)
    await expect(
      solidRenderer.check.call(
        request,
        () => ({ $$typeof: Symbol.for("react.element") }),
        {},
        {}
      )
    ).resolves.toBe(false)
  })

  it("keeps handled errors inside an Errored fallback", async () => {
    const rendered = await solidRenderer.renderToStaticMarkup.call(
      context(),
      () =>
        createComponent(Errored, {
          fallback: () => ssr("<p>Handled error</p>"),
          get children(): never {
            throw new Error("Contained failure")
          }
        }),
      {},
      {},
      { astroStaticSlot: true, displayName: "HandledErrorFixture" }
    )
    expect(rendered.html).toContain("Handled error")
    expect(rendered.html).not.toContain("<script")
  })

  it("propagates synchronous render failures to Astro", async () => {
    const context = {
      result: {
        componentMetadata: new Map(),
        resolve: async (specifier: string) => specifier
      }
    } as ThisParameterType<typeof solidRenderer.renderToStaticMarkup>

    await expect(
      solidRenderer.renderToStaticMarkup.call(
        context,
        () => {
          throw new Error("Renderer regression probe")
        },
        {},
        {},
        {
          hydrate: "load",
          displayName: "FailingComponent",
          astroStaticSlot: true
        }
      )
    ).rejects.toThrow("Renderer regression probe")
  })

  it("propagates unhandled lazy failures to Astro", async () => {
    const Failing = lazy(async () => {
      throw new Error("Async renderer regression probe")
    })
    await expect(
      solidRenderer.renderToStaticMarkup.call(
        context(),
        () => createComponent(Failing, {}),
        {},
        {},
        {
          hydrate: "load",
          astroStaticSlot: true,
          displayName: "AsyncErrorFixture"
        }
      )
    ).rejects.toThrow("Async renderer regression probe")
  })
})
