import { Slider } from "~/registry/ui/slider"

export default function SliderRange() {
  return <Slider defaultValue={[25, 50]} min={0} max={100} step={5} class="w-full max-w-sm" />
}
