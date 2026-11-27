import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function DropdownMenuIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(partProps) => <Button {...partProps} variant="outline" />}
        class="w-fit"
      >
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconPlaceholder lucide="UserIcon" class="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlaceholder lucide="CreditCardIcon" class="size-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlaceholder lucide="SettingsIcon" class="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <IconPlaceholder lucide="LogOutIcon" class="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
