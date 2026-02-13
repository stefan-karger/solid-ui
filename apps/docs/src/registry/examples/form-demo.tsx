import { createForm, email, minLength, required, type SubmitHandler } from "@modular-forms/solid"
import { Button } from "~/registry/ui/button"
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/registry/ui/form"
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
    alert(`Form submitted!\nUsername: ${values.username}\nEmail: ${values.email}\nBio: ${values.bio}`)
  }

  return (
    <div class="w-full max-w-md">
      <Form onSubmit={handleSubmit} class="space-y-6">
        <FormField of={profileForm} name="username">
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
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={field.value}
                    autocomplete="username"
                    required
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

        <FormField of={profileForm} name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Field
              name="email"
              validate={[required("Email is required"), email("Please enter a valid email address")]}
            >
              {(field, props) => (
                <>
                  <Input
                    {...props}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={field.value}
                    autocomplete="email"
                    required
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

        <FormField of={profileForm} name="bio">
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
                    id="bio"
                    placeholder="Tell us a little bit about yourself"
                    class="resize-none"
                    value={field.value}
                    autocomplete="off"
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
