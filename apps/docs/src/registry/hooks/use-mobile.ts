import { createSignal, onSettled } from "solid-js"

const MOBILE_BREAKPOINT = 768

export function useIsMobile(fallback = false) {
  const [isMobile, setIsMobile] = createSignal(fallback)
  onSettled(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches)
    }
    mql.addEventListener("change", onChange)
    onChange(mql)
    return () => mql.removeEventListener("change", onChange)
  })
  return isMobile
}
