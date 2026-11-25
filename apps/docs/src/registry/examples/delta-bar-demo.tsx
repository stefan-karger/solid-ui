import { DeltaBar } from "~/registry/ui/delta-bar"

export default function DeltaBarDemo() {
  return (
    <div class="grid w-full max-w-sm gap-4">
      <div class="grid gap-2">
        <p class="text-sm font-medium">Revenue is trending above target</p>
        <DeltaBar value={58} />
      </div>
      <div class="grid gap-2">
        <p class="text-sm font-medium">Churn improved versus last month</p>
        <DeltaBar value={-34} />
      </div>
      <div class="grid gap-2">
        <p class="text-sm font-medium">Pipeline is on plan</p>
        <DeltaBar value={0} />
      </div>
    </div>
  )
}
