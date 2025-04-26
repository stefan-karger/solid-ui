import { IconBrandTypescript, IconChevronDown, IconPlus, IconStar } from "@/components/icons"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/registry/ui/dropdown-menu"
import { Separator } from "@/registry/ui/separator"

export function SolidUI() {
  return (
    <Card>
      <CardHeader class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div class="space-y-1">
          <CardTitle>solid-ui</CardTitle>
          <CardDescription>
            Beautifully designed components built with Kobalte and Tailwind CSS.
          </CardDescription>
        </div>
        <div class="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" class="px-3 shadow-none">
            <IconStar class="mr-2 size-4" />
            Star
          </Button>
          <Separator orientation="vertical" class="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger as={Button<"button">} variant="secondary" class="px-2 shadow-none">
              <IconChevronDown class="size-4 text-secondary-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>Suggested Lists</DropdownMenuGroupLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup defaultValue="future-ideas">
                  <DropdownMenuRadioItem value="future-ideas">Future ideas</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="my-stack">My Stack</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="inspiration">Inspiration</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <IconPlus class="mr-2 size-4" /> Create list
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex space-x-4 text-sm text-muted-foreground">
          <div class="flex items-center">
            <IconBrandTypescript class="mr-1 size-3 text-sky-400" />
            TypeScript
          </div>
          <div class="flex items-center">
            <IconStar class="mr-1 size-3" />
            160
          </div>
          <div>Updated November 2023</div>
        </div>
      </CardContent>
    </Card>
  )
}
