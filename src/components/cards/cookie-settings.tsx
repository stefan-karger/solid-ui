import { Button } from "~/registry/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import { Label } from "~/registry/ui/label";
import { Switch, SwitchControl, SwitchThumb } from "~/registry/ui/switch";

export function CookieSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <CardDescription>Manage your cookie settings here.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="flex items-center justify-between space-x-2">
          <Label class="flex flex-col space-y-1" for="necessary">
            <span>Strictly Necessary</span>
            <span class="font-normal text-muted-foreground leading-snug">
              These cookies are essential in order to use the website and use
              its features.
            </span>
          </Label>
          <Switch defaultChecked id="necessary">
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
          </Switch>
        </div>
        <div class="flex items-center justify-between space-x-2">
          <Label class="flex flex-col space-y-1" for="functional">
            <span>Functional Cookies</span>
            <span class="font-normal text-muted-foreground leading-snug">
              These cookies allow the website to provide personalized
              functionality.
            </span>
          </Label>
          <Switch id="functional">
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
          </Switch>
        </div>
        <div class="flex items-center justify-between space-x-2">
          <Label class="flex flex-col space-y-1" for="performance">
            <span>Performance Cookies</span>
            <span class="font-normal text-muted-foreground leading-snug">
              These cookies help to improve the performance of the website.
            </span>
          </Label>
          <Switch id="performance">
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
          </Switch>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" variant="outline">
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  );
}
