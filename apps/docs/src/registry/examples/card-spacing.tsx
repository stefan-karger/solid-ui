import { createSignal, For } from "solid-js"

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
    className: "[--card-spacing:--spacing(4)]",
    label: "16px",
    value: "4"
  },
  {
    className: "[--card-spacing:--spacing(5)]",
    label: "20px",
    value: "5"
  },
  {
    className: "[--card-spacing:--spacing(6)]",
    label: "24px",
    value: "6"
  },
  {
    className: "[--card-spacing:--spacing(8)]",
    label: "32px",
    value: "8"
  }
]

export default function CardSpacing() {
  const [spacing, setSpacing] = createSignal("4")
  const selectedSpacing = () => spacingOptions.find((option) => option.value === spacing())

  return (
    <div class="mx-auto grid w-full max-w-sm gap-4">
      <ToggleGroup
        deselectable={false}
        value={[spacing()]}
        onValueChange={(value) => {
          if (value[0]) {
            setSpacing(value[0])
          }
        }}
        variant="outline"
        size="sm"
        class="justify-center"
      >
        <For each={spacingOptions}>
          {(option) => <ToggleGroupItem value={option.value}>{option.label}</ToggleGroupItem>}
        </For>
      </ToggleGroup>
      <Card class={selectedSpacing()?.className}>
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
                <Label for="email-spacing">Email</Label>
                <Input id="email-spacing" type="email" placeholder="m@example.com" required />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label for="password-spacing">Password</Label>
                  <a
                    href="#"
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password-spacing" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex-col gap-2">
          <Button type="submit" class="w-full">
            Login
          </Button>
          <Button variant="outline" class="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
