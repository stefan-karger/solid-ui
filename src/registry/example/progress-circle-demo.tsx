import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar";
import { Card } from "~/registry/ui/card";
import { ProgressCircle } from "~/registry/ui/progress-circle";

export default function ProgressCircleDemo() {
  return (
    <div class="flex flex-col items-center gap-3">
      <p class="text-muted-foreground text-sm"> Without children </p>
      <Card class="p-4">
        <div class="flex items-center justify-start space-x-5">
          <ProgressCircle value={75} />
          <div>
            <p class="font-medium text-tremor-content-strong text-tremor-default dark:text-dark-tremor-content-strong">
              $340/$450 (75%)
            </p>
            <p class="text-tremor-content text-tremor-default dark:text-dark-tremor-content">
              Spend management control
            </p>
          </div>
        </div>
      </Card>
      <p class="text-muted-foreground text-sm">Progress value as children</p>
      <Card class="mx-auto max-w-sm p-4">
        <div class="flex items-center justify-start space-x-5">
          <ProgressCircle value={75}>
            <span class="font-medium text-slate-700 text-xs">75%</span>
          </ProgressCircle>
          <div>
            <p class="font-medium text-tremor-content-strong text-tremor-default dark:text-dark-tremor-content-strong">
              $340/$450 (75%)
            </p>
            <p class="text-tremor-content text-tremor-default dark:text-dark-tremor-content">
              Spend management control
            </p>
          </div>
        </div>
      </Card>
      <p class="text-muted-foreground text-sm"> Avatar as children </p>
      <Card class="mx-auto max-w-sm p-4">
        <div class="flex items-center justify-center space-x-5">
          <ProgressCircle value={75}>
            <Avatar class="size-12">
              <AvatarImage src="https://github.com/stefan-karger.png" />
              <AvatarFallback>EK</AvatarFallback>
            </Avatar>
          </ProgressCircle>
          <div>
            <p class="font-medium text-tremor-content-strong text-tremor-default dark:text-dark-tremor-content-strong">
              $340/$450 (75%)
            </p>
            <p class="text-tremor-content text-tremor-default dark:text-dark-tremor-content">
              Spend management control
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
