import { Button } from "~/registry/ui/button"

export default function ButtonGhost() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="ghost">View details</Button>
      <Button disabled variant="ghost">
        Disabled
      </Button>
    </div>
  )
}
