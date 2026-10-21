import { GitBranchIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonWithIcon() {
  return (
    <Button size="sm" variant="outline">
      <GitBranchIcon /> New Branch
    </Button>
  )
}
