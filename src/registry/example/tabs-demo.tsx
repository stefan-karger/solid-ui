import { Button } from "~/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/registry/ui/text-field";

export default function TabsDemo() {
  return (
    <Tabs class="w-[400px]" defaultValue="account">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <TextField class="space-y-1">
              <TextFieldLabel>Name</TextFieldLabel>
              <TextFieldInput type="text" value="Pedro Duarte" />
            </TextField>
            <TextField class="space-y-1">
              <TextFieldLabel>Username</TextFieldLabel>
              <TextFieldInput type="text" value="@peduarte" />
            </TextField>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <TextField class="space-y-1">
              <TextFieldLabel>Current password</TextFieldLabel>
              <TextFieldInput type="password" />
            </TextField>
            <TextField class="space-y-1">
              <TextFieldLabel>New password</TextFieldLabel>
              <TextFieldInput type="password" />
            </TextField>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
