import type { JSX } from "@solidjs/web"
import { createContext, useContext, type Accessor } from "solid-js"

type Direction = "ltr" | "rtl"
type DirectionProviderProps = {
  children: JSX.Element
  direction?: Direction
  locale?: string
  class?: string
}
const DirectionContext = createContext<Accessor<Direction>>(() => "ltr")
const DirectionProvider = (props: DirectionProviderProps) => {
  const direction = () =>
    props.direction ??
    (props.locale && /^(ar|fa|he|ur)(-|$)/i.test(props.locale) ? "rtl" : "ltr")
  return (
    <DirectionContext value={direction}>
      <div dir={direction()} lang={props.locale} class={props.class}>
        {props.children}
      </div>
    </DirectionContext>
  )
}
const useDirection = (): Accessor<Direction> => useContext(DirectionContext)
export {
  DirectionProvider,
  useDirection,
  type Direction,
  type DirectionProviderProps
}
