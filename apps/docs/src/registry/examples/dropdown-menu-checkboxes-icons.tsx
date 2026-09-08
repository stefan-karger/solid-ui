import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-solid"
import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function DropdownMenuCheckboxesIcons() {
  const [notifications, setNotifications] = createSignal({
    email: true,
    sms: false,
    push: true
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Notifications
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications().email}
            onChange={(checked) =>
              setNotifications((prev) => ({ ...prev, email: checked === true }))
            }
          >
            <MailIcon class="size-4" />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications().sms}
            onChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked === true }))}
          >
            <MessageSquareIcon class="size-4" />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications().push}
            onChange={(checked) =>
              setNotifications((prev) => ({ ...prev, push: checked === true }))
            }
          >
            <BellIcon class="size-4" />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
