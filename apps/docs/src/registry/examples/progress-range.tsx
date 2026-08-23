import { Progress, ProgressLabel, ProgressValue } from "~/registry/ui/progress"

export default function ProgressRange() {
  return (
    <Progress class="w-full max-w-sm" maxValue={10} minValue={0} value={5}>
      <div class="flex w-full justify-between">
        <ProgressLabel>5 of 10 tasks completed</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  )
}
