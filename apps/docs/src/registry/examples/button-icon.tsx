import { DownloadIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"

export default function ButtonIcon() {
  return (
    <Button size="icon" variant="outline">
      <DownloadIcon />
    </Button>
  )
}
