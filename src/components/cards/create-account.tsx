import { IconBrandGithub, IconBrandGoogle } from "~/components/icons";
import { Button } from "~/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/registry/ui/text-field";

export function CreateAccount() {
  return (
    <Card>
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent class="grid gap-4">
        <div class="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <IconBrandGithub class="mr-2 size-4" />
            Github
          </Button>
          <Button variant="outline">
            <IconBrandGoogle class="mr-2 size-4" />
            Google
          </Button>
        </div>
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <TextField class="grid gap-2">
          <TextFieldLabel>Email</TextFieldLabel>
          <TextFieldInput placeholder="m@example.com" type="email" />
        </TextField>
        <TextField class="grid gap-2">
          <TextFieldLabel>Password</TextFieldLabel>
          <TextFieldInput type="password" />
        </TextField>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Create account</Button>
      </CardFooter>
    </Card>
  );
}
