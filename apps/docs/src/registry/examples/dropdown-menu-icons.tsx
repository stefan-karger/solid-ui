import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-solid"

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
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon class="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon class="size-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon class="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon class="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
