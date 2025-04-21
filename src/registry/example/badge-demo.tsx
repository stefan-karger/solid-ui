import { Badge } from "~/registry/ui/badge";

export default function BadgeDemo() {
  return (
    <div class="flex gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge round>Round</Badge>
    </div>
  );
}
