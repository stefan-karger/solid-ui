import { Card, CardContent, CardFooter, CardHeader } from "~/registry/ui/card"
import { Skeleton } from "~/registry/ui/skeleton"

export function AccountAccess() {
  return (
    <Card>
      <CardHeader class="gap-2">
        <Skeleton class="h-5 w-36 rounded-md" />
        <Skeleton class="h-4 w-64 rounded-md" />
      </CardHeader>
      <CardContent class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <Skeleton class="h-3 w-24 rounded-md" />
          <Skeleton class="h-9 w-full rounded-lg" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <Skeleton class="h-3 w-32 rounded-md" />
            <Skeleton class="h-3 w-12 rounded-md" />
          </div>
          <Skeleton class="h-9 w-full rounded-lg" />
        </div>
      </CardContent>
      <CardFooter class="flex-col gap-4">
        <Skeleton class="h-9 w-full rounded-lg" />
        <Skeleton class="h-14 w-full rounded-xl" />
      </CardFooter>
    </Card>
  )
}
