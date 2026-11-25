import { DeltaBar } from "~/registry/ui/delta-bar"

export default function DeltaBarCustomColors() {
  return (
    <div class="grid w-full max-w-sm gap-4">
      <div class="grid gap-2">
        <p class="text-sm font-medium">Bookings are outperforming forecast</p>
        <DeltaBar
          value={63}
          class="**:data-[tone=negative]:bg-amber-500 **:data-[tone=positive]:bg-sky-500 dark:**:data-[tone=negative]:bg-amber-400 dark:**:data-[tone=positive]:bg-sky-400"
        />
      </div>
      <div class="grid gap-2">
        <p class="text-sm font-medium">Refunds are trending above plan</p>
        <DeltaBar
          value={-28}
          class="**:data-[tone=negative]:bg-amber-500 **:data-[tone=positive]:bg-sky-500 dark:**:data-[tone=negative]:bg-amber-400 dark:**:data-[tone=positive]:bg-sky-400"
        />
      </div>
    </div>
  )
}
