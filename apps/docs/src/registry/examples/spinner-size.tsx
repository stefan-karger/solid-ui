import { Spinner } from "~/registry/ui/spinner"

export default function SpinnerSize() {
  return (
    <div class="flex items-center gap-6">
      <Spinner class="size-3" />
      <Spinner class="size-4" />
      <Spinner class="size-6" />
      <Spinner class="size-8" />
    </div>
  )
}
