import { createForm, email, minLength, required, type SubmitHandler } from "@modular-forms/solid"

import { Button } from "~/registry/ui/button"
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/registry/ui/form"
import { Input } from "~/registry/ui/input"
import { Textarea } from "~/registry/ui/textarea"

type ProfileFormValues = {
  username: string
  email: string
  bio: string
}

export default function FormDemo() {
  const [profileForm, { Form, Field }] = createForm<ProfileFormValues>({
    initialValues: {
      username: "",
      email: "",
      bio: ""
    }
  })

  const handleSubmit: SubmitHandler<ProfileFormValues> = (values) => {
    console.log("Form submitted:", values)
    alert(
      `Form submitted!\nUsername: ${values.username}\nEmail: ${values.email}\nBio: ${values.bio}`
    )
  }

  return (
    <div class="w-full max-w-md">
      <Form class="space-y-6" onSubmit={handleSubmit}>
        <FormField name="username" of={profileForm}>
          <FormItem>
            <FormLabel>Username</FormLabel>
            <Field
              name="username"
              validate={[
                required("Username is required"),
                minLength(3, "Username must be at least 3 characters")
              ]}
            >
              {(field, props) => (
                <>
                  <Input
                    {...props}
                    autocomplete="username"
                    id="username"
                    placeholder="johndoe"
                    required
                    type="text"
                    value={field.value}
                  />
                  <FormDescription>
                    This is your public display name. It can be your real name or a pseudonym.
                  </FormDescription>
                  <FormMessage />
                </>
              )}
            </Field>
          </FormItem>
        </FormField>

        <FormField name="email" of={profileForm}>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Field
              name="email"
              validate={[
                required("Email is required"),
                email("Please enter a valid email address")
              ]}
            >
              {(field, props) => (
                <>
                  <Input
                    {...props}
                    autocomplete="email"
                    id="email"
                    placeholder="john@example.com"
                    required
                    type="email"
                    value={field.value}
                  />
                  <FormDescription>
                    We'll use this email to contact you about your account.
                  </FormDescription>
                  <FormMessage />
                </>
              )}
            </Field>
          </FormItem>
        </FormField>

        <FormField name="bio" of={profileForm}>
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <Field
              name="bio"
              validate={[
                minLength(10, "Bio must be at least 10 characters"),
                (value) => {
                  if (value && value.length > 160) {
                    return "Bio must not exceed 160 characters"
                  }
                  return ""
                }
              ]}
            >
              {(field, props) => (
                <>
                  <Textarea
                    {...props}
                    autocomplete="off"
                    class="resize-none"
                    id="bio"
                    placeholder="Tell us a little bit about yourself"
                    value={field.value}
                  />
                  <FormDescription>
                    You can write up to 160 characters about yourself.
                  </FormDescription>
                  <FormMessage />
                </>
              )}
            </Field>
          </FormItem>
        </FormField>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
