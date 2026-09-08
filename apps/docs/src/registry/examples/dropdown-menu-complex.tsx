import {
  BellIcon,
  CircleQuestionMark,
  CreditCardIcon,
  DownloadIcon,
  EllipsisIcon,
  EyeIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  FolderSearchIcon,
  KeyboardIcon,
  LanguagesIcon,
  LayoutPanelTopIcon,
  LogOutIcon,
  MailIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  SaveIcon,
  SettingsIcon,
  ShieldIcon,
  SunIcon,
  UserIcon
} from "lucide-solid"
import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function DropdownMenuComplex() {
  const [notifications, setNotifications] = createSignal({
    email: true,
    sms: false,
    push: true
  })
  const [theme, setTheme] = createSignal("light")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Complex Menu
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>File</DropdownMenuLabel>
          <DropdownMenuItem>
            <FileIcon class="size-4" />
            New File
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderIcon class="size-4" />
            New Folder
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderOpenIcon class="size-4" />
              Open Recent
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                <DropdownMenuItem>
                  <FileCodeIcon class="size-4" />
                  Project Alpha
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileCodeIcon class="size-4" />
                  Project Beta
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <EllipsisIcon class="size-4" />
                    More Projects
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <FileCodeIcon class="size-4" />
                      Project Gamma
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileCodeIcon class="size-4" />
                      Project Delta
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <FolderSearchIcon class="size-4" />
                  Browse...
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SaveIcon class="size-4" />
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadIcon class="size-4" />
            Export
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications().email}
            onChange={(checked) =>
              setNotifications((prev) => ({ ...prev, email: checked === true }))
            }
          >
            <EyeIcon class="size-4" />
            Show Sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications().sms}
            onChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked === true }))}
          >
            <LayoutPanelTopIcon class="size-4" />
            Show Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <PaletteIcon class="size-4" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuRadioGroup onChange={setTheme} value={theme()}>
                  <DropdownMenuRadioItem value="light">
                    <SunIcon class="size-4" />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <MoonIcon class="size-4" />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <MonitorIcon class="size-4" />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon class="size-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon class="size-4" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SettingsIcon class="size-4" />
              Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                <DropdownMenuItem>
                  <KeyboardIcon class="size-4" />
                  Keyboard Shortcuts
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LanguagesIcon class="size-4" />
                  Language
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <BellIcon class="size-4" />
                    Notifications
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Notification Types</DropdownMenuLabel>
                      <DropdownMenuCheckboxItem
                        checked={notifications().push}
                        onChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, push: checked === true }))
                        }
                      >
                        <BellIcon class="size-4" />
                        Push Notifications
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={notifications().email}
                        onChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, email: checked === true }))
                        }
                      >
                        <MailIcon class="size-4" />
                        Email Notifications
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <ShieldIcon class="size-4" />
                  Privacy and Security
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CircleQuestionMark class="size-4" />
            Help and Support
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileTextIcon class="size-4" />
            Documentation
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <LogOutIcon class="size-4" />
            Sign Out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
