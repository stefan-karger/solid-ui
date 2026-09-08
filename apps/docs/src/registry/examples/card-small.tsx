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
  return (
    <Card class="mx-auto w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>This card uses the small size variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The card component supports a size prop that can be set to &quot;sm&quot; for a more
          compact appearance.
        </p>
      </CardContent>
      <CardFooter>
        <Button class="w-full" size="sm" variant="outline">
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}
