import { PlusIcon } from "lucide-solid"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage
} from "~/registry/ui/avatar"

export default function AvatarGroupCountIcon() {
  return (
    <AvatarGroup class="grayscale">
      <Avatar>
        <AvatarImage alt="@stefan-karger" src="https://github.com/stefan-karger.png" />
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@carere" src="https://github.com/carere.png" />
        <AvatarFallback>KA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@ryansolid" src="https://github.com/ryansolid.png" />
        <AvatarFallback>RC</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>
        <PlusIcon class="size-3" />
      </AvatarGroupCount>
    </AvatarGroup>
  )
}
