import { GitBranchIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <GitBranchIcon /> New Branch
    </Button>
  )
}
