import { DeltaBar } from "~/registry/ui/delta-bar";

export default function DeltaBarDemo() {
  return (
    <div class="flex flex-col gap-4">
      <p>DeltaBar with default increase behavior</p>
      <DeltaBar class="w-[400px]" value={60} />
      <p>DeltaBar with increase seen as negative</p>
      <DeltaBar class="w-[400px]" isIncreasePositive={false} value={60} />
    </div>
  );
}
