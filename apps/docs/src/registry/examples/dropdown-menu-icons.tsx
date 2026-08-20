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
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
