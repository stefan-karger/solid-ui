import { Button } from "~/registry/ui/button"

export default function ButtonAsChild() {
  return (
    <Button as="a" href="/login">
      Login
    </Button>
  )
}
