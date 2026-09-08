import { Badge } from "~/registry/ui/badge"

export default function BadgeVariants() {
  return (
    <div class="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  )
}
