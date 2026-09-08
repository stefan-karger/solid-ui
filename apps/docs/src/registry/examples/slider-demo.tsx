import { Slider } from "~/registry/ui/slider"

export default function SliderDemo() {
  return <Slider defaultValue={[75]} max={100} step={1} class="mx-auto w-full max-w-xs" />
}
