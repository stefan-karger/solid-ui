import { Progress } from "~/registry/ui/progress"

export default function ProgressDemo() {
  return (
    <div class="grid w-full max-w-sm gap-4">
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={80} />
    </div>
  )
}
