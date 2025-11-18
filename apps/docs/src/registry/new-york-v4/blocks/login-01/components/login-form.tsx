import { type ComponentProps, splitProps } from "solid-js"

import { cn } from "~/registry/new-york-v4/lib/utils"
import { Button } from "~/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/registry/new-york-v4/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/registry/new-york-v4/ui/field"
import { Input } from "~/registry/new-york-v4/ui/input"

export function LoginForm(props: ComponentProps<"div">) {
  const [local, other] = splitProps(props, ["class"])
  return (
    <div class={cn("flex flex-col gap-6", local.class)} {...other}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel for="email">Email</FieldLabel>
                <Input id="email" placeholder="m@example.com" required type="email" />
              </Field>
              <Field>
                <div class="flex items-center">
                  <FieldLabel for="password">Password</FieldLabel>
                  <a
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" required type="password" />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button type="button" variant="outline">
                  Login with Google
                </Button>
                <FieldDescription class="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
