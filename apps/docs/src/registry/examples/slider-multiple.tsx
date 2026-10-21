import { Slider } from "~/registry/ui/slider"

export default function SliderMultiple() {
  return (
    <Slider class="mx-auto w-full max-w-xs" defaultValue={[10, 20, 70]} maxValue={100} step={10} />
  )
}
