import { Card, CardContent, CardFooter, CardHeader } from "~/registry/ui/card"
import { Skeleton } from "~/registry/ui/skeleton"

export function ClaimableBalance() {
  return (
    <Card>
      <CardHeader class="gap-3">
        <Skeleton class="h-4 w-36 rounded-md" />
        <Skeleton class="h-12 w-56 rounded-lg" />
        <Skeleton class="h-6 w-32 rounded-full" />
      </CardHeader>
      <CardContent class="flex flex-1 flex-col justify-end">
        <div class="flex flex-col gap-3 rounded-xl bg-muted p-4">
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-28 rounded-md bg-muted-foreground/15" />
            <Skeleton class="h-4 w-20 rounded-md bg-muted-foreground/15" />
          </div>
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-32 rounded-md bg-muted-foreground/15" />
            <Skeleton class="h-4 w-16 rounded-md bg-muted-foreground/15" />
          </div>
          <Skeleton class="h-px w-full rounded-none bg-muted-foreground/15" />
          <div class="flex items-center justify-between">
            <Skeleton class="h-4 w-36 rounded-md bg-muted-foreground/15" />
            <Skeleton class="h-4 w-24 rounded-md bg-muted-foreground/15" />
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex-col gap-2">
        <Skeleton class="h-3 w-full rounded-md" />
        <Skeleton class="h-3 w-11/12 rounded-md" />
        <Skeleton class="h-3 w-3/4 rounded-md" />
      </CardFooter>
    </Card>
  )
}
