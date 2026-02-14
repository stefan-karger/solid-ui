import type { Accessor, ParentComponent } from "solid-js"
import { createContext, useContext } from "solid-js"

type Direction = "ltr" | "rtl"

type DirectionProviderProps = {
  dir?: Direction
  direction?: Direction
}

const DirectionContext = createContext<Accessor<Direction>>(() => "ltr" as Direction)

const DirectionProvider: ParentComponent<DirectionProviderProps> = (props) => {
  const dir = () => props.direction ?? props.dir ?? "ltr"

  return <DirectionContext.Provider value={dir}>{props.children}</DirectionContext.Provider>
}

const useDirection = () => {
  return useContext(DirectionContext)
}

export { DirectionProvider, useDirection }
export type { Direction }
