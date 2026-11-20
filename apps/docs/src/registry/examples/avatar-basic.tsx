import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        class="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
