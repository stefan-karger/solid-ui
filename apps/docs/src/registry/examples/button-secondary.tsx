import { Button } from "~/registry/ui/button"

export default function ButtonSecondary() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="secondary">Later</Button>
      <Button disabled variant="secondary">
        Disabled
      </Button>
    </div>
  )
}
