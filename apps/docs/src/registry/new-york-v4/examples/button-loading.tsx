import { Button } from "~/registry/new-york-v4/ui/button"
import { Spinner } from "~/registry/new-york-v4/ui/spinner"

export default function ButtonLoading() {
  return (
    <Button disabled size="sm" variant="outline">
      <Spinner /> Submit
    </Button>
  )
}
