import { Show } from "solid-js"
import { useParams } from "@solidjs/router"

import { Index } from "@/__registry__"

export default function Block() {
  const params = useParams()

  return (
    <Show when={Index[params.name]}>
      {(item) => {
        const Component = item().component
        return <Component />
      }}
    </Show>
  )
}
