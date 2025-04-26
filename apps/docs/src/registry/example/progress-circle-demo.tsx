import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Card } from "@/registry/ui/card"
import { ProgressCircle } from "@/registry/ui/progress-circle"

export default function ProgressCircleDemo() {
  return (
    <div class="flex flex-col items-center gap-3">
      <p class="text-sm text-muted-foreground"> Without children </p>
      <Card class="p-4">
        <div class="flex items-center justify-start space-x-5">
          <ProgressCircle value={75} />
          <div>
            <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              $340/$450 (75%)
            </p>
            <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Spend management control
            </p>
          </div>
        </div>
      </Card>
      <p class="text-sm text-muted-foreground">Progress value as children</p>
      <Card class="mx-auto max-w-sm p-4">
        <div class="flex items-center justify-start space-x-5">
          <ProgressCircle value={75}>
            <span class="text-xs font-medium text-slate-700">75%</span>
          </ProgressCircle>
          <div>
            <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              $340/$450 (75%)
            </p>
            <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Spend management control
            </p>
          </div>
        </div>
      </Card>
      <p class="text-sm text-muted-foreground"> Avatar as children </p>
      <Card class="mx-auto max-w-sm p-4">
        <div class="flex items-center justify-center space-x-5">
          <ProgressCircle value={75}>
            <Avatar class="size-12">
              <AvatarImage src="https://github.com/stefan-karger.png" />
              <AvatarFallback>EK</AvatarFallback>
            </Avatar>
          </ProgressCircle>
          <div>
            <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              $340/$450 (75%)
            </p>
            <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Spend management control
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
