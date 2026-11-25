import { DeltaBar } from "~/registry/ui/delta-bar"

export default function DeltaBarInverted() {
  return (
    <div class="grid w-full max-w-sm gap-4">
      <div class="grid gap-2">
        <p class="text-sm font-medium">Response time increased</p>
        <DeltaBar value={42} isIncreasePositive={false} />
      </div>
      <div class="grid gap-2">
        <p class="text-sm font-medium">Error rate decreased</p>
        <DeltaBar value={-27} isIncreasePositive={false} />
      </div>
    </div>
  )
}
