import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"

export default function AvatarSize() {
  return (
    <div class="flex flex-wrap items-center gap-2 grayscale">
      <Avatar size="sm">
        <AvatarImage alt="@stefan-karger" src="https://github.com/stefan-karger.png" />
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@stefan-karger" src="https://github.com/stefan-karger.png" />
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage alt="@stefan-karger" src="https://github.com/stefan-karger.png" />
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
    </div>
  )
}
