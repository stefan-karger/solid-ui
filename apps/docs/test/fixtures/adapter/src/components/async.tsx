import { lazy } from "solid-js"
const Lazy = lazy(() => import("./lazy"))
export default function Async() {
  return <Lazy />
}
