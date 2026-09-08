import { ArrowUpRightIcon } from "lucide-solid"

import { Badge } from "~/registry/ui/badge"

export default function BadgeLink() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Badge as="a" href="#">
        Docs
        <ArrowUpRightIcon class="size-3" data-icon="inline-end" />
      </Badge>
      <Badge as="a" href="#" variant="secondary">
        Changelog
        <ArrowUpRightIcon class="size-3" data-icon="inline-end" />
      </Badge>
      <Badge as="a" href="#" variant="ghost">
        Release notes
        <ArrowUpRightIcon class="size-3" data-icon="inline-end" />
      </Badge>
    </div>
  )
}
