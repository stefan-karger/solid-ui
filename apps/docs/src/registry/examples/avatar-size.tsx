import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarSizeExample() {
  return (
    <div class="flex flex-wrap items-center gap-2 grayscale">
      <Avatar size="sm">
        <AvatarImage src="/avatars/03.png" alt="@alex" />
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/avatars/03.png" alt="@alex" />
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="/avatars/03.png" alt="@alex" />
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
    </div>
  )
}
