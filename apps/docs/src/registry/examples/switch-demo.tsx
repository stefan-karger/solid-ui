import { Label } from "~/registry/ui/label"
import { Switch } from "~/registry/ui/switch"

export default function SwitchDemo() {
  return (
    <div class="flex items-center gap-3">
      <Switch id="airplane-mode" />
      <Label for="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
