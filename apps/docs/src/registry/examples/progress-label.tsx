import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "~/registry/ui/progress"

export default function ProgressWithLabel() {
  return (
    <Progress value={56} class="w-full max-w-sm">
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
