import { Badge } from "~/registry/ui/badge";

export default function BadgeDemo() {
  return (
    <div class="flex gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge round>Round</Badge>
    </div>
  );
}
