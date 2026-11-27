import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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
  const [scope, setScope] = createSignal("Documentation")

  return (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={(partProps) => (
                <InputGroupButton
                  {...partProps}
                  size="icon-xs"
                  variant="ghost"
                />
              )}
              aria-label="More"
            >
              <IconPlaceholder lucide="EllipsisIcon" class="size-4" />
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

      <InputGroup class="[--radius:1rem]">
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={(partProps) => (
                <InputGroupButton {...partProps} variant="ghost" />
              )}
              class="pr-1.5 text-xs"
            >
              {scope()}
              <IconPlaceholder lucide="ChevronDownIcon" class="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent class="[--radius:0.95rem]">
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setScope("Documentation")}>
                  Documentation
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setScope("Blog Posts")}>
                  Blog Posts
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setScope("Changelog")}>
                  Changelog
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
