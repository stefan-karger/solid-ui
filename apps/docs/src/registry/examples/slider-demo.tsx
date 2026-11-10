import { Slider } from "~/registry/ui/slider"

export default function SliderDemo() {
  return <Slider class="mx-auto w-full max-w-xs" defaultValue={[75]} maxValue={100} step={1} />
}
