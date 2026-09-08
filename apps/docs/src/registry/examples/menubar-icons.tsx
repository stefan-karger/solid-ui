import { ArchiveIcon, FileIcon, FolderIcon, InfoIcon, SearchIcon, TrashIcon } from "lucide-solid"

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
            <FileIcon class="size-4" />
            New File <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <FolderIcon class="size-4" />
            Open Folder
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <ArchiveIcon class="size-4" />
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>More</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              <SearchIcon class="size-4" />
              Search
            </MenubarItem>
            <MenubarItem>
              <InfoIcon class="size-4" />
              Help
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              <TrashIcon class="size-4" />
              Delete
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
