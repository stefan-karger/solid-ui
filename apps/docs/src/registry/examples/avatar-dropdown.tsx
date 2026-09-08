import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"
import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} class="rounded-full" size="icon" variant="ghost">
        <Avatar>
          <AvatarImage alt="@stefan-karger" src="https://github.com/stefan-karger.png" />
          <AvatarFallback>SK</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
