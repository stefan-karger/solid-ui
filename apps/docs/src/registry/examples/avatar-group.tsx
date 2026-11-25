import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage
} from "~/registry/ui/avatar"

export default function AvatarGroupExample() {
  return (
    <AvatarGroup class="grayscale">
      <Avatar>
        <AvatarImage src="/avatars/03.png" alt="@alex" />
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
