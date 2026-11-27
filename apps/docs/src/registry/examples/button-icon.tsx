import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Button } from "~/registry/ui/button"

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconPlaceholder lucide="GitBranchIcon" /> New Branch
    </Button>
  )
}
