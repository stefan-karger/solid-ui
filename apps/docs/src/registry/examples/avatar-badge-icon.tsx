import { PlusIcon } from "lucide-solid"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarBadgeIcon() {
  return (
    <Avatar class="grayscale">
      <AvatarImage alt="@michaelessiet" src="https://github.com/michaelessiet.png" />
      <AvatarFallback>ME</AvatarFallback>
      <AvatarBadge>
        <PlusIcon class="size-3" />
      </AvatarBadge>
    </Avatar>
  )
}
