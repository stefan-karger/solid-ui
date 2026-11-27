import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from "~/registry/ui/menubar"

export default function MenubarIcons() {
  return (
    <Menubar class="w-72">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <IconPlaceholder lucide="FileIcon" class="size-4" />
            New File <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <IconPlaceholder lucide="FolderIcon" class="size-4" />
            Open Folder
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <IconPlaceholder lucide="ArchiveIcon" class="size-4" />
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>More</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              <IconPlaceholder lucide="SearchIcon" class="size-4" />
              Search
            </MenubarItem>
            <MenubarItem>
              <IconPlaceholder lucide="InfoIcon" class="size-4" />
              Help
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              <IconPlaceholder lucide="TrashIcon" class="size-4" />
              Delete
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
