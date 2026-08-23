import { Progress, ProgressLabel, ProgressValue } from "~/registry/ui/progress"

export default function ProgressWithLabel() {
  return (
    <Progress class="w-full max-w-sm" value={56}>
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
