import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage
} from "~/registry/ui/avatar"

export default function AvatarDemo() {
  return (
    <div class="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Avatar>
        <AvatarImage
          alt="@stefan-karger"
          class="grayscale"
          src="https://github.com/stefan-karger.png"
        />
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage alt="@ryansolid" src="https://github.com/ryansolid.png" />
        <AvatarFallback>RC</AvatarFallback>
        <AvatarBadge class="bg-green-600 dark:bg-green-800" />
      </Avatar>

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
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
