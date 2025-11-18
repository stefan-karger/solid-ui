import { IconGitBranch } from "~/components/icons"
import { Button } from "~/registry/new-york-v4/ui/button"

export default function ButtonWithIcon() {
  return (
    <Button size="sm" variant="outline">
      <IconGitBranch /> New Branch
    </Button>
  )
}
