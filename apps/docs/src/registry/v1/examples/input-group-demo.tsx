import { IconArrowUp, IconCheck, IconInfoCircle, IconPlus, IconSearch } from "~/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/registry/v1/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from "~/registry/v1/ui/input-group"
import { Separator } from "~/registry/v1/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/v1/ui/tooltip"

export default function InputGroupDemo() {
  return (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <IconSearch />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput class="!pl-1" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger as={InputGroupButton} class="rounded-full" size="icon-xs">
              <IconInfoCircle />
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, Search or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton class="rounded-full" size="icon-xs" variant="outline">
            <IconPlus />
          </InputGroupButton>
          <DropdownMenu placement="top-start">
            <DropdownMenuTrigger as={InputGroupButton} variant="ghost">
              Auto
            </DropdownMenuTrigger>
            <DropdownMenuContent class="[--radius:0.95rem]">
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText class="ml-auto">52% used</InputGroupText>
          <Separator class="!h-4" orientation="vertical" />
          <InputGroupButton class="rounded-full" disabled size="icon-xs" variant="default">
            <IconArrowUp />
            <span class="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="@shadcn" />
        <InputGroupAddon align="inline-end">
          <div class="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <IconCheck class="size-3" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
