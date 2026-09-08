import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarBadgeExample() {
  return (
    <Avatar>
      <AvatarImage alt="@stefan-karger" src="https://github.com/stefan-karger.png" />
      <AvatarFallback>SK</AvatarFallback>
      <AvatarBadge class="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}
