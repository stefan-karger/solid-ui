import { Button } from "~/registry/ui/button"

export default function ButtonDestructive() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="destructive">Delete project</Button>
      <Button disabled variant="destructive">
        Disabled
      </Button>
    </div>
  )
}
