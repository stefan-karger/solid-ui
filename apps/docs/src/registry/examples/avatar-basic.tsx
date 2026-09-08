import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarBasic() {
  return (
    <Avatar>
      <AvatarImage
        alt="@stefan-karger"
        class="grayscale"
        src="https://github.com/stefan-karger.png"
      />
      <AvatarFallback>SK</AvatarFallback>
    </Avatar>
  )
}
