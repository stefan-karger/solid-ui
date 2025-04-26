import { DeltaBar } from "@/registry/ui/delta-bar"

export default function DeltaBarDemo() {
  return (
    <div class="flex flex-col gap-4">
      <p>DeltaBar with default increase behavior</p>
      <DeltaBar value={60} class="w-[400px]" />
      <p>DeltaBar with increase seen as negative</p>
      <DeltaBar value={60} isIncreasePositive={false} class="w-[400px]" />
    </div>
  )
}
