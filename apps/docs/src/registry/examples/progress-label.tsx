import { Progress, ProgressLabel, ProgressValue } from "~/registry/ui/progress"

export default function ProgressLabelDemo() {
  return (
    <Progress value={66} class="grid w-full max-w-sm gap-2">
      <div class="flex items-center gap-2">
        <ProgressLabel>Uploading assets</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  )
}
