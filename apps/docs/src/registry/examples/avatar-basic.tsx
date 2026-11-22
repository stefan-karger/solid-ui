import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="/avatars/03.png" alt="@alex" class="grayscale" />
      <AvatarFallback>AM</AvatarFallback>
    </Avatar>
  )
}
