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
        <AvatarImage alt="@shadcn" class="grayscale" src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@evilrabbit" src="https://github.com/evilrabbit.png" />
        <AvatarFallback>ER</AvatarFallback>
        <AvatarBadge class="bg-green-600 dark:bg-green-800" />
      </Avatar>
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
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
