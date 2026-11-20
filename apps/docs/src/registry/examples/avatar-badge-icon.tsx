import { PlusIcon } from "lucide-solid"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage
} from "~/registry/ui/avatar"

export default function AvatarBadgeIconExample() {
  return (
    <Avatar class="grayscale">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  )
}
