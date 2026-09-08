import { Slider } from "~/registry/ui/slider"

export default function SliderVertical() {
  return (
    <div class="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
      <Slider defaultValue={[50]} max={100} step={1} orientation="vertical" class="h-40" />
      <Slider defaultValue={[25]} max={100} step={1} orientation="vertical" class="h-40" />
    </div>
  )
}
