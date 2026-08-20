import { Badge } from "~/registry/ui/badge"

export default function BadgeStatus() {
  return (
    <div class="flex flex-col gap-3">
      <div class="flex flex-wrap gap-2">
        <Badge variant="primary-light">Primary</Badge>
        <Badge variant="destructive-light">Destructive</Badge>
        <Badge variant="success-light">Success</Badge>
        <Badge variant="warning-light">Warning</Badge>
        <Badge variant="info-light">Info</Badge>
      </div>
      <div class="flex flex-wrap gap-2">
        <Badge variant="primary-outline">Primary</Badge>
        <Badge variant="destructive-outline">Destructive</Badge>
        <Badge variant="success-outline">Success</Badge>
        <Badge variant="warning-outline">Warning</Badge>
        <Badge variant="info-outline">Info</Badge>
      </div>
    </div>
  )
}
