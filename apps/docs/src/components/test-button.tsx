import { Button } from "~/registry/ui/button"

export function TestButton() {
  return <Button onClick={() => console.log("hello")}>Log hello</Button>
}
