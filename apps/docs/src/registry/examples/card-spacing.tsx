import { createMemo, createSignal, For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Input } from "~/registry/ui/input"
import { Label } from "~/registry/ui/label"
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

const spacingOptions = [
  {
    class: "[--card-spacing:--spacing(4)]",
    label: "16px",
    value: "4"
  },
  {
    class: "[--card-spacing:--spacing(5)]",
    label: "20px",
    value: "5"
  },
  {
    class: "[--card-spacing:--spacing(6)]",
    label: "24px",
    value: "6"
  },
  {
    class: "[--card-spacing:--spacing(8)]",
    label: "32px",
    value: "8"
  }
]

export default function CardSpacing() {
  const [spacing, setSpacing] = createSignal("4")
  const selectedSpacing = createMemo(() =>
    spacingOptions.find((option) => option.value === spacing())
  )

  return (
    <div class="mx-auto grid w-full max-w-sm gap-4">
      <ToggleGroup
        class="justify-center"
        onChange={(value) => setSpacing(value ?? "4")}
        size="sm"
        value={spacing()}
        variant="outline"
      >
        <For each={spacingOptions}>
          {(option) => <ToggleGroupItem value={option.value}>{option.label}</ToggleGroupItem>}
        </For>
      </ToggleGroup>
      <Card class={selectedSpacing()?.class}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div class="flex flex-col gap-6">
              <div class="grid gap-2">
                <Label for="card-spacing-email">Email</Label>
                <Input id="card-spacing-email" placeholder="m@example.com" required type="email" />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label for="card-spacing-password">Password</Label>
                  <a
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    href="/docs"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="card-spacing-password" required type="password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex-col gap-2">
          <Button class="w-full" type="submit">
            Login
          </Button>
          <Button class="w-full" variant="outline">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
