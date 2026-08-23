import { Slider } from "~/registry/ui/slider"

export default function SliderRange() {
  return <Slider class="mx-auto w-full max-w-xs" defaultValue={[25, 50]} maxValue={100} step={5} />
}
