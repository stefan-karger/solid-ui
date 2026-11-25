import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage
} from "~/registry/ui/avatar"

export default function AvatarWithBadge() {
  return (
    <Avatar>
      <AvatarImage src="/avatars/03.png" alt="@alex" />
      <AvatarFallback>AM</AvatarFallback>
      <AvatarBadge class="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}
