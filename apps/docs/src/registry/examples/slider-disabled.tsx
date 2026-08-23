import { Slider } from "~/registry/ui/slider"

export default function SliderDisabled() {
  return (
    <Slider class="mx-auto w-full max-w-xs" defaultValue={[50]} disabled maxValue={100} step={1} />
  )
}
