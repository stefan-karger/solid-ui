import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup class="grayscale">
      <Avatar>
        <AvatarImage alt="@carere" src="https://github.com/carere.png" />
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@evilrabbit" src="https://github.com/evilrabbit.png" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
