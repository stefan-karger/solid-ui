import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarBadgeDemo() {
  return (
    <Avatar>
      <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge class="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}
