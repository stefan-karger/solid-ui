import { BadgeDelta } from "~/registry/ui/badge-delta";

export default function BadgeDeltaDemo() {
  return (
    <div class="flex flex-col gap-4">
      <p>BadgeDelta with pre-defined status icons</p>
      <div class="flex flex-wrap gap-2">
        <BadgeDelta deltaType="increase">text</BadgeDelta>
        <BadgeDelta deltaType="moderateIncrease">text</BadgeDelta>
        <BadgeDelta deltaType="unchanged">text</BadgeDelta>
        <BadgeDelta deltaType="moderateDecrease">text</BadgeDelta>
        <BadgeDelta deltaType="decrease">text</BadgeDelta>
      </div>
      <p>BadgeDelta without text</p>
      <div class="flex flex-wrap gap-2">
        <BadgeDelta deltaType="increase" />
        <BadgeDelta deltaType="moderateIncrease" />
        <BadgeDelta deltaType="unchanged" />
        <BadgeDelta deltaType="moderateDecrease" />
        <BadgeDelta deltaType="decrease" />
      </div>
    </div>
  );
}
