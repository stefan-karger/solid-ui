import { Button } from "~/registry/ui/button"

export default function ButtonDefault() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Button>Save changes</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}
