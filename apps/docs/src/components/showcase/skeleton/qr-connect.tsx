import { Card, CardContent, CardHeader } from "~/registry/ui/card"
import { Skeleton } from "~/registry/ui/skeleton"

export function QrConnect() {
  return (
    <Card>
      <CardContent class="flex justify-center pt-6">
        <Skeleton class="size-44 rounded-xl" />
      </CardContent>
      <CardHeader class="items-center gap-2 text-center">
        <Skeleton class="h-5 w-56 rounded-md" />
        <Skeleton class="h-4 w-64 rounded-md" />
        <Skeleton class="h-4 w-48 rounded-md" />
      </CardHeader>
    </Card>
  )
}
