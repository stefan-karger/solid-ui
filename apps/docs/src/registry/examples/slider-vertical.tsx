import { Slider } from "~/registry/ui/slider"

export default function SliderVertical() {
  return (
    <div class="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
      <Slider class="h-40" defaultValue={[50]} maxValue={100} orientation="vertical" step={1} />
      <Slider class="h-40" defaultValue={[25]} maxValue={100} orientation="vertical" step={1} />
    </div>
  )
}
