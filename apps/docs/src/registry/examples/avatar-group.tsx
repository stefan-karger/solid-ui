import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarGroupExample() {
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
    </AvatarGroup>
  )
}
