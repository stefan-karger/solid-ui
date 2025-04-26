import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxTrigger
} from "@/registry/ui/combobox"

interface Role {
  label: string
  description: string
}

const OPTIONS: Role[] = [
  { label: "Viewer", description: "Can view and comment." },
  { label: "Developer", description: "Can view, comment and edit." },
  { label: "Billing", description: "Can view, comment and manage billing." },
  { label: "Owner", description: "Admin-level access to all resources." }
]

export function TeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Invite your team members to collaborate.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="flex items-center justify-between space-x-4">
          <div class="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p class="text-sm font-medium leading-none">Sofia Davis</p>
              <p class="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          <Combobox<Role>
            options={OPTIONS}
            defaultValue={OPTIONS[3]}
            optionValue="label"
            optionTextValue="label"
            optionLabel="label"
            placeholder="Select new role..."
            itemComponent={(props) => (
              <ComboboxItem item={props.item} class="flex flex-col items-start space-y-1 px-4 py-2">
                <ComboboxItemLabel>
                  <p>{props.item.rawValue.label}</p>
                  <p class="text-sm text-muted-foreground">{props.item.rawValue.description}</p>
                </ComboboxItemLabel>
              </ComboboxItem>
            )}
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
              <p class="text-sm font-medium leading-none">Jackson Lee</p>
              <p class="text-sm text-muted-foreground">p@example.com</p>
            </div>
          </div>
          <Combobox<Role>
            options={OPTIONS}
            defaultValue={OPTIONS[0]}
            optionValue="label"
            optionTextValue="label"
            optionLabel="label"
            placeholder="Select new role..."
            itemComponent={(props) => (
              <ComboboxItem item={props.item} class="flex flex-col items-start space-y-1 px-4 py-2">
                <ComboboxItemLabel>
                  <p>{props.item.rawValue.label}</p>
                  <p class="text-sm text-muted-foreground">{props.item.rawValue.description}</p>
                </ComboboxItemLabel>
              </ComboboxItem>
            )}
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
              <p class="text-sm font-medium leading-none">Isabella Nguyen</p>
              <p class="text-sm text-muted-foreground">i@example.com</p>
            </div>
          </div>
          <Combobox<Role>
            options={OPTIONS}
            defaultValue={OPTIONS[0]}
            optionValue="label"
            optionTextValue="label"
            optionLabel="label"
            placeholder="Select new role..."
            itemComponent={(props) => (
              <ComboboxItem item={props.item} class="flex flex-col items-start space-y-1 px-4 py-2">
                <ComboboxItemLabel>
                  <p>{props.item.rawValue.label}</p>
                  <p class="text-sm text-muted-foreground">{props.item.rawValue.description}</p>
                </ComboboxItemLabel>
              </ComboboxItem>
            )}
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
  )
}
