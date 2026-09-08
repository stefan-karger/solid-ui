import { Button } from "~/registry/ui/button"

export default function ButtonOutline() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="outline">Edit profile</Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
    </div>
  )
}
