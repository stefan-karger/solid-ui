import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"

export default function ButtonInteractive() {
  const [count, setCount] = createSignal(0)

  return (
    <Button onClick={() => setCount((value) => value + 1)}>
      Clicked {count()} times
    </Button>
  )
}
