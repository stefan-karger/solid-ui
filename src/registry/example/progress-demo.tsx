import {
  Progress,
  ProgressLabel,
  ProgressValueLabel,
} from "~/registry/ui/progress";

export default function ProgressDemo() {
  return (
    <Progress
      class="w-[300px] space-y-1"
      getValueLabel={({ value, max }) => `${value} of ${max} tasks completed`}
      maxValue={10}
      minValue={0}
      value={3}
    >
      <div class="flex justify-between">
        <ProgressLabel>Processing...</ProgressLabel>
        <ProgressValueLabel />
      </div>
    </Progress>
  );
}
