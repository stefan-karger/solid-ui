import { ChevronDownIcon, MoreHorizontalIcon } from "lucide-solid"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"

export default function InputGroupDropdown() {
  return (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu gutter={8} placement="bottom-end">
            <DropdownMenuTrigger
              aria-label="More"
              as={InputGroupButton}
              size="icon-xs"
              variant="ghost"
            >
              <MoreHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Copy path</DropdownMenuItem>
                <DropdownMenuItem>Open location</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu gutter={8} placement="bottom-end">
            <DropdownMenuTrigger as={InputGroupButton} class="pr-1.5! text-xs" variant="ghost">
              Search In... <ChevronDownIcon class="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                <DropdownMenuItem>Changelog</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
