import type { SubmitHandler } from "@modular-forms/solid"
import { createForm } from "@modular-forms/solid"

import { IconBrandGithub, IconLoader } from "@/components/icons"
import { Button } from "@/registry/ui/button"
import { Grid } from "@/registry/ui/grid"
import { TextField, TextFieldInput, TextFieldLabel } from "@/registry/ui/text-field"

import type { AuthForm } from "./validations/auth"

export function UserAuthForm() {
  const [authForm, { Form, Field }] = createForm<AuthForm>()

  const handleSubmit: SubmitHandler<AuthForm> = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <div class="grid gap-6">
      <Form onSubmit={handleSubmit}>
        <Grid class="gap-4">
          <Field name="email">
            {(_, props) => (
              <TextField class="gap-1">
                <TextFieldLabel class="sr-only">Email</TextFieldLabel>
                <TextFieldInput {...props} type="email" placeholder="me@email.com" />
              </TextField>
            )}
          </Field>
          <Button type="submit" disabled={authForm.submitting}>
            {authForm.submitting && <IconLoader class="mr-2 size-4 animate-spin" />}
            Login
          </Button>
        </Grid>
      </Form>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={authForm.submitting}>
        {authForm.submitting ? (
          <IconLoader class="mr-2 size-4 animate-spin" />
        ) : (
          <IconBrandGithub class="mr-2 size-4" />
        )}{" "}
        Github
      </Button>
    </div>
  )
}
