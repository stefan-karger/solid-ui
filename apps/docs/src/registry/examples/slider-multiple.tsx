import { Slider } from "~/registry/ui/slider"

export default function SliderMultiple() {
  return <Slider defaultValue={[20, 45, 80]} min={0} max={100} step={1} class="w-full max-w-sm" />
}
