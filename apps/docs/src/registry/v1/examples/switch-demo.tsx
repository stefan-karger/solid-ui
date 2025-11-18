import { Label } from "~/registry/v1/ui/label"
import { Switch } from "~/registry/v1/ui/switch"

export default function SwitchDemo() {
  return (
    <div class="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label for="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
