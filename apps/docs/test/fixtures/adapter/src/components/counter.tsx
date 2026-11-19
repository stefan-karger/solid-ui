import type { JSX } from "@solidjs/web"
import { createSignal, onCleanup, untrack } from "solid-js"

export default function Counter(props: {
  initial: number
  children?: JSX.Element
  namedSlot?: JSX.Element
}) {
  const [count, setCount] = createSignal(untrack(() => props.initial))
  onCleanup(() => {
    if (typeof window !== "undefined") window.dispatchEvent(new Event("counter:disposed"))
  })
  return (
    <section>
      <button onClick={() => setCount(count() + 1)}>count: {count()}</button>
      <div>{props.children}</div>
      <aside>{props.namedSlot}</aside>
    </section>
  )
}
