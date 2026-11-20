import { Card, CardContent, CardFooter, CardHeader } from "~/registry/ui/card"
import { Skeleton } from "~/registry/ui/skeleton"

export function PayoutThreshold() {
  return (
    <Card>
      <CardHeader class="gap-2">
        <Skeleton class="h-5 w-44 rounded-md" />
        <Skeleton class="h-4 w-72 rounded-md" />
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3 w-32 rounded-md" />
          <Skeleton class="h-9 w-full rounded-lg" />
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex items-baseline justify-between">
            <Skeleton class="h-3 w-40 rounded-md" />
            <Skeleton class="h-7 w-24 rounded-md" />
          </div>
          <Skeleton class="h-2 w-full rounded-full" />
          <div class="flex items-center justify-between">
            <Skeleton class="h-3 w-16 rounded-md" />
            <Skeleton class="h-3 w-20 rounded-md" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3 w-16 rounded-md" />
          <Skeleton class="h-[100px] w-full rounded-lg" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton class="h-9 w-full rounded-lg" />
      </CardFooter>
    </Card>
  )
}
