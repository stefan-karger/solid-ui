import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/registry/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxTrigger,
} from "~/registry/ui/combobox";

interface Role {
  label: string;
  description: string;
}

const OPTIONS: Role[] = [
  { description: "Can view and comment.", label: "Viewer" },
  { description: "Can view, comment and edit.", label: "Developer" },
  { description: "Can view, comment and manage billing.", label: "Billing" },
  { description: "Admin-level access to all resources.", label: "Owner" },
];

export function TeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="flex items-center justify-between space-x-4">
          <div class="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p class="font-medium text-sm leading-none">Sofia Davis</p>
              <p class="text-muted-foreground text-sm">m@example.com</p>
            </div>
          </div>
          <Combobox<Role>
            defaultValue={OPTIONS[3]}
            itemComponent={(props) => (
              <ComboboxItem
                class="flex flex-col items-start space-y-1 px-4 py-2"
                item={props.item}
              >
                <ComboboxItemLabel>
                  <p>{props.item.rawValue.label}</p>
                  <p class="text-muted-foreground text-sm">
                    {props.item.rawValue.description}
                  </p>
                </ComboboxItemLabel>
              </ComboboxItem>
            )}
            optionLabel="label"
            options={OPTIONS}
            optionTextValue="label"
            optionValue="label"
            placeholder="Select new role..."
          >
            <ComboboxControl aria-label="Food">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>
        <div class="flex items-center justify-between space-x-4">
          <div class="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/02.png" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div>
              <p class="font-medium text-sm leading-none">Jackson Lee</p>
              <p class="text-muted-foreground text-sm">p@example.com</p>
            </div>
          </div>
          <Combobox<Role>
            defaultValue={OPTIONS[0]}
            itemComponent={(props) => (
              <ComboboxItem
                class="flex flex-col items-start space-y-1 px-4 py-2"
                item={props.item}
              >
                <ComboboxItemLabel>
                  <p>{props.item.rawValue.label}</p>
                  <p class="text-muted-foreground text-sm">
                    {props.item.rawValue.description}
                  </p>
                </ComboboxItemLabel>
              </ComboboxItem>
            )}
            optionLabel="label"
            options={OPTIONS}
            optionTextValue="label"
            optionValue="label"
            placeholder="Select new role..."
          >
            <ComboboxControl aria-label="Food">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>
        <div class="flex items-center justify-between space-x-4">
          <div class="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/03.png" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div>
              <p class="font-medium text-sm leading-none">Isabella Nguyen</p>
              <p class="text-muted-foreground text-sm">i@example.com</p>
            </div>
          </div>
          <Combobox<Role>
            defaultValue={OPTIONS[0]}
            itemComponent={(props) => (
              <ComboboxItem
                class="flex flex-col items-start space-y-1 px-4 py-2"
                item={props.item}
              >
                <ComboboxItemLabel>
                  <p>{props.item.rawValue.label}</p>
                  <p class="text-muted-foreground text-sm">
                    {props.item.rawValue.description}
                  </p>
                </ComboboxItemLabel>
              </ComboboxItem>
            )}
            optionLabel="label"
            options={OPTIONS}
            optionTextValue="label"
            optionValue="label"
            placeholder="Select new role..."
          >
            <ComboboxControl aria-label="Food">
              <ComboboxInput />
              <ComboboxTrigger />
            </ComboboxControl>
            <ComboboxContent />
          </Combobox>
        </div>
      </CardContent>
    </Card>
  );
}
