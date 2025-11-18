import { Button } from "~/registry/v1/ui/button"
import { Spinner } from "~/registry/v1/ui/spinner"

export default function ButtonLoading() {
  return (
    <Button disabled size="sm" variant="outline">
      <Spinner /> Submit
    </Button>
  )
}
