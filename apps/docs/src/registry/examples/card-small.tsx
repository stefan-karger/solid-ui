import { ChevronRight } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"

export default function CardSmall() {
  const featureName = "Scheduled reports"

  return (
    <Card class="mx-auto w-full max-w-xs" size="sm">
      <CardHeader>
        <CardTitle>{featureName}</CardTitle>
        <CardDescription>Weekly snapshots. No more manual exports.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul class="grid gap-2 py-2 text-sm">
          <li class="flex gap-2">
            <ChevronRight class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>Choose a schedule (daily, or weekly).</span>
          </li>
          <li class="flex gap-2">
            <ChevronRight class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>Send to channels or specific teammates.</span>
          </li>
          <li class="flex gap-2">
            <ChevronRight class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>Include charts, tables, and key metrics.</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter class="flex-col gap-2">
        <Button class="w-full" size="sm">
          Set up scheduled reports
        </Button>
        <Button class="w-full" size="sm" variant="outline">
          See what&apos;s new
        </Button>
      </CardFooter>
    </Card>
  )
}
