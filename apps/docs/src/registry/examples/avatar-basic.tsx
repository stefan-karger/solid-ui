import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarBasic() {
  return (
    <Avatar>
      <AvatarImage alt="@shadcn" class="grayscale" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
