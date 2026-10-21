import { Progress, ProgressLabel } from "~/registry/ui/progress"

export default function ProgressIndeterminate() {
  return (
    <Progress class="w-full max-w-sm" indeterminate>
      <ProgressLabel>Processing...</ProgressLabel>
    </Progress>
  )
}
