import { Slider } from "~/registry/ui/slider"

export default function SliderDisabled() {
  return <Slider defaultValue={[50]} max={100} step={1} disabled class="mx-auto w-full max-w-xs" />
}
