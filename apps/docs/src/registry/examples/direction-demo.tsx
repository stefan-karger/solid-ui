import { createSignal } from "solid-js"

import { DirectionProvider, useDirection } from "~/registry/ui/direction"
import { NativeSelect } from "~/registry/ui/native-select"

function DirectionDisplay() {
  const dir = useDirection()

  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground text-sm">Current direction:</span>
        <span class="font-semibold text-foreground">{dir()}</span>
      </div>
      <div class="rounded-lg border p-4" dir={dir()}>
        <div class="space-y-2">
          <p class="text-sm">
            {dir() === "rtl"
              ? "هذا النص باللغة العربية يظهر من اليمين إلى اليسار"
              : "This is English text that flows from left to right"}
          </p>
          <div class="flex gap-2">
            <div class="h-8 w-8 rounded bg-primary" />
            <div class="h-8 w-8 rounded bg-primary" />
            <div class="h-8 w-8 rounded bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DirectionDemo() {
  const [direction, setDirection] = createSignal<"ltr" | "rtl">("ltr")

  return (
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <label class="font-medium text-sm">Language:</label>
        <NativeSelect
          class="w-[200px]"
          onChange={(e) => setDirection(e.currentTarget.value as "ltr" | "rtl")}
          value={direction()}
        >
          <option value="ltr">English (LTR)</option>
          <option value="rtl">العربية (RTL)</option>
        </NativeSelect>
      </div>
      <DirectionProvider direction={direction()}>
        <DirectionDisplay />
      </DirectionProvider>
    </div>
  )
}
