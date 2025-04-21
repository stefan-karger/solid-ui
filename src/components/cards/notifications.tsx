import { IconBell, IconEyeOff } from "~/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";

export function Notifications() {
  return (
    <Card>
      <CardHeader class="pb-3">
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose what you want to be notified about.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-1">
        <div class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <IconBell class="mt-px size-5" />
          <div class="space-y-1">
            <p class="font-medium text-sm leading-none">Everything</p>
            <p class="text-muted-foreground text-sm">
              Email digest, mentions & all activity.
            </p>
          </div>
        </div>
        <div class="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
          <IconBell class="mt-px size-5" />
          <div class="space-y-1">
            <p class="font-medium text-sm leading-none">Available</p>
            <p class="text-muted-foreground text-sm">
              Only mentions and comments.
            </p>
          </div>
        </div>
        <div class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <IconEyeOff class="mt-px size-5" />
          <div class="space-y-1">
            <p class="font-medium text-sm leading-none">Ignoring</p>
            <p class="text-muted-foreground text-sm">
              Turn off all notifications.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
