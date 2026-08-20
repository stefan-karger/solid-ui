import { createSignal } from "solid-js"

import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-solid"

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
  const [notifications, setNotifications] = createSignal({ email: true, sms: false, push: true })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Notifications
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications().email}
            onChange={(checked) =>
              setNotifications({ ...notifications(), email: checked === true })
            }
          >
            <MailIcon />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications().sms}
            onChange={(checked) => setNotifications({ ...notifications(), sms: checked === true })}
          >
            <MessageSquareIcon />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications().push}
            onChange={(checked) => setNotifications({ ...notifications(), push: checked === true })}
          >
            <BellIcon />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
