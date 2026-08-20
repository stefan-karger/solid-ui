import { PlusIcon } from "lucide-solid"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarBadgeIcon() {
  return (
    <Avatar class="grayscale">
      <AvatarImage alt="@pranathip" src="https://github.com/pranathip.png" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  )
}
