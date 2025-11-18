import { createEffect, createSignal, onCleanup } from "solid-js"

const MOBILE_BREAKPOINT = 768

export function useIsMobile(fallback = false) {
  const [isMobile, setIsMobile] = createSignal(fallback)

  createEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }
    mql.addEventListener("change", onChange)
    onChange(mql)
    onCleanup(() => mql.removeEventListener("change", onChange))
  })

  return isMobile
}
